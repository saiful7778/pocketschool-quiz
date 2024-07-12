import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import type {
  Answer,
  multipleAnswerType,
  multipleOptionType,
  pinPointAnswerType,
  textAnswerType,
} from "../../../types/question.type";
import inputCheck from "../../../utils/inputCheck";
import createHttpError from "http-errors";
import {
  multipleOptionQuestion,
  multipleOptionAnswer,
  multipleAnswerQuestion,
  multipleAnswerAnswer,
  textAnswerQuestion,
  textAnswerAnswer,
  pinPointAnswerQuestion,
  pinPointAnswerAnswer,
} from "../../../models/question.model";
import { quizAnswerModel, quizModel } from "../../../models/quiz.model";
import { ProjectionType, Types } from "mongoose";

class quizResultController {
  private answerBaseData = {
    quiz: "",
    participant: "",
  };
  private totalMarks: number = 0;
  private totalAnswers: number = 0;

  private validateData(answers: Answer[], next: NextFunction): boolean {
    const check = inputCheck([answers], next);
    if (!check) return false;

    if (!Array.isArray(answers)) {
      next(createHttpError(400, "answers must be an array"));
      return false;
    }

    if (answers.length === 0) {
      next(createHttpError(400, "question array is empty"));
      return false;
    }

    const isAnswersAvailable = answers.map((answer) => {
      if (
        (answer.index < 0 && answer.index > 50) ||
        !answer._id ||
        !answer.answerType
      ) {
        return undefined;
      }
      return answer;
    });

    if (isAnswersAvailable.includes(undefined)) {
      next(createHttpError(400, "invalid answers data"));
      return false;
    }
    return true;
  }

  private async createNullAnswer(
    answerType: Answer["answerType"],
    answerIndex: number,
    questionId: Types.ObjectId | string
  ) {
    switch (answerType) {
      case "multipleOptionAnswer":
        return multipleOptionAnswer.create({
          ...this.answerBaseData,
          index: answerIndex,
          answerIndex: null,
          question: questionId,
          isCorrect: false,
          mark: 0,
        });

      case "multipleAnswerAnswer":
        return multipleAnswerAnswer.create({
          ...this.answerBaseData,
          index: answerIndex,
          answerIndices: null,
          question: questionId,
          isCorrect: false,
          mark: 0,
        });

      case "textAnswerAnswer":
        return textAnswerAnswer.create({
          ...this.answerBaseData,
          index: answerIndex,
          answer: null,
          question: questionId,
          isCorrect: false,
          mark: 0,
        });

      case "pinPointAnswerAnswer":
        return pinPointAnswerAnswer.create({
          ...this.answerBaseData,
          index: answerIndex,
          pinPointAnswer: null,
          question: questionId,
          isCorrect: false,
          mark: 0,
        });
    }
  }

  private async getQuestionData<T>(
    answerType: Answer["answerType"],
    answerId: Answer["_id"],
    options: ProjectionType<T>
  ) {
    switch (answerType) {
      case "multipleOptionAnswer":
        return multipleOptionQuestion.findOne<T>({ _id: answerId }, options);

      case "multipleAnswerAnswer":
        return multipleAnswerQuestion.findOne<T>({ _id: answerId }, options);

      case "textAnswerAnswer":
        return textAnswerQuestion.findOne<T>({ _id: answerId }, options);

      case "pinPointAnswerAnswer":
        return pinPointAnswerQuestion.findOne<T>({ _id: answerId }, options);
    }
  }

  private async multipleOption(answerData: Answer) {
    const questionData = await this.getQuestionData<{
      _id: string;
      correctAnswerIndex: number;
      mark: number;
    }>("multipleOptionAnswer", answerData._id, {
      correctAnswerIndex: 1,
      mark: 1,
    });
    const answer = answerData.answer as multipleOptionType;

    if (answer === null) {
      return this.createNullAnswer(
        "multipleOptionAnswer",
        answerData.index,
        questionData._id
      );
    }
    this.totalAnswers++;

    if (questionData.correctAnswerIndex === answerData.answer) {
      this.totalMarks += questionData.mark;

      return multipleOptionAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answerIndex: answerData.answer,
        question: questionData._id,
        isCorrect: true,
        mark: questionData.mark,
      });
    } else {
      return multipleOptionAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answerIndex: answerData.answer,
        question: questionData._id,
        isCorrect: false,
        mark: 0,
      });
    }
  }
  private async multipleAnswer(answerData: Answer) {
    const questionData = await this.getQuestionData<{
      _id: string;
      correctAnswerIndices: number[];
      mark: number;
    }>("multipleAnswerAnswer", answerData._id, {
      correctAnswerIndices: 1,
      mark: 1,
    });

    const answer = answerData.answer as multipleAnswerType;

    if (answer === null) {
      return this.createNullAnswer(
        "multipleAnswerAnswer",
        answerData.index,
        questionData._id
      );
    }
    this.totalAnswers++;

    if (questionData.correctAnswerIndices.length !== answer.length) {
      return multipleAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answerIndices: answer,
        question: questionData._id,
        isCorrect: false,
        mark: 0,
      });
    }

    const answerIndicesMatched = [];

    for (let i = 0; i < questionData.correctAnswerIndices.length; i++) {
      if (questionData.correctAnswerIndices[i] !== answer[i]) {
        answerIndicesMatched.push(undefined);
      }
    }

    if (answerIndicesMatched.includes(undefined)) {
      return multipleAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answerIndices: answer,
        question: questionData._id,
        isCorrect: false,
        mark: 0,
      });
    } else {
      this.totalMarks += questionData.mark;

      return multipleAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answerIndices: answer,
        question: questionData._id,
        isCorrect: true,
        mark: questionData.mark,
      });
    }
  }
  private async textAnswer(answerData: Answer) {
    const questionData = await this.getQuestionData<{
      _id: string;
      correctAnswer: string;
      mark: number;
    }>("textAnswerAnswer", answerData._id, { correctAnswer: 1, mark: 1 });

    const answer = answerData.answer as textAnswerType;

    if (answer === null) {
      return this.createNullAnswer(
        "textAnswerAnswer",
        answerData.index,
        questionData._id
      );
    }
    this.totalAnswers++;

    if (questionData.correctAnswer.length !== answer.length) {
      return textAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answer: answer,
        question: questionData._id,
        isCorrect: false,
        mark: 0,
      });
    }

    if (questionData.correctAnswer !== answer) {
      return textAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answer: answer,
        question: questionData._id,
        isCorrect: false,
        mark: 0,
      });
    } else {
      this.totalMarks += questionData.mark;

      return textAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answer: answer,
        question: questionData._id,
        isCorrect: true,
        mark: questionData.mark,
      });
    }
  }
  private async pinPointAnswer(answerData: Answer) {
    const questionData = await this.getQuestionData<{
      _id: string;
      correctPinPointAnswer: {
        x: number;
        y: number;
      };
      mark: number;
    }>("pinPointAnswerAnswer", answerData._id, {
      correctPinPointAnswer: 1,
      mark: 1,
    });

    const answer = answerData.answer as pinPointAnswerType;

    if (answer === null) {
      return this.createNullAnswer(
        "pinPointAnswerAnswer",
        answerData.index,
        questionData._id
      );
    }
    this.totalAnswers++;

    if (
      questionData.correctPinPointAnswer.x === answer.x &&
      questionData.correctPinPointAnswer.y === answer.y
    ) {
      this.totalMarks += questionData.mark;

      return pinPointAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answer: answer,
        question: questionData._id,
        isCorrect: true,
        mark: questionData.mark,
      });
    } else {
      return pinPointAnswerAnswer.create({
        ...this.answerBaseData,
        index: answerData.index,
        answer: answer,
        question: questionData._id,
        isCorrect: false,
        mark: 0,
      });
    }
  }

  private async createQuestionAnswers(answers: Answer[]) {
    return Promise.all(
      answers.map(async (answer) => {
        const answerType = answer.answerType;

        if (answerType === "multipleOptionAnswer") {
          return this.multipleOption(answer);
        }

        if (answerType === "multipleAnswerAnswer") {
          return this.multipleAnswer(answer);
        }

        if (answerType === "textAnswerAnswer") {
          return this.textAnswer(answer);
        }

        if (answerType === "pinPointAnswerAnswer") {
          return this.pinPointAnswer(answer);
        }
      })
    );
  }

  public createResult(req: Request, res: Response, next: NextFunction) {
    const { classroomId, userId } = req.query as {
      classroomId: string;
      userId: string;
    };
    const quizId = req.params.quizId;
    const { answers } = req.body as {
      answers: Answer[];
    };

    const check = this.validateData(answers, next);
    if (!check) return;

    serverHelper(async () => {
      this.answerBaseData.quiz = quizId;
      this.answerBaseData.participant = userId;

      const questionAnswers = await this.createQuestionAnswers(answers);

      const answerIds = [];
      const successAnswers = [];
      const failedAnswers = [];

      for (const answer of questionAnswers) {
        answerIds.push(answer._id);
        if (answer.isCorrect) {
          successAnswers.push(answer);
        } else {
          failedAnswers.push(answer);
        }
      }

      const quizAnswer = await quizAnswerModel.create({
        quiz: quizId,
        participant: userId,
        classroom: classroomId,
        totalMarks: this.totalMarks,
        totalAnswers: this.totalAnswers,
        answers: answerIds,
      });

      await quizModel.updateOne(
        {
          _id: new Types.ObjectId(quizId),
        },
        {
          $push: {
            participants: { user: userId, answer: quizAnswer._id },
          },
        }
      );

      res.status(201).json({
        success: true,
        data: {
          totalQuestions: this.totalAnswers,
          totalMarks: this.totalMarks,
          successAnswers: {
            count: successAnswers.length,
            answers: successAnswers,
          },
          failedAnswers: {
            count: failedAnswers.length,
            answers: failedAnswers,
          },
        },
      });
    }, next);
  }
}

const quizResult = new quizResultController();

export default quizResult.createResult.bind(quizResult);
