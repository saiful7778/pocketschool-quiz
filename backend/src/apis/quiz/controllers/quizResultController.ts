import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import type { AnswerBase } from "../../../types/question.type";
import inputCheck from "../../../utils/inputCheck";
import createHttpError from "http-errors";
import {
  multipleAnswerAnswer,
  multipleAnswerQuestion,
  multipleOptionAnswer,
  multipleOptionQuestion,
  pinPointAnswerAnswer,
  pinPointAnswerQuestion,
  textAnswerAnswer,
  textAnswerQuestion,
} from "../../../models/question.model";
import { quizAnswerModel, quizModel } from "../../../models/quiz.model";
import { Types } from "mongoose";

export default function quizResultController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { classroomId, userId } = req.query as {
    classroomId: string;
    userId: string;
  };
  const quizId = req.params.quizId;
  const { answers } = req.body as {
    answers: AnswerBase[];
  };

  // validate
  const check = inputCheck([answers], next);
  if (!check) return;

  if (!Array.isArray(answers)) {
    return next(createHttpError(400, "answers must be an array"));
  }

  if (answers.length === 0) {
    return next(createHttpError(400, "question array is empty"));
  }

  const isAnswersAvailable = answers.map((answer) => {
    if (!answer._id || !answer.questionType) {
      return undefined;
    }
    return answer;
  });

  if (isAnswersAvailable.includes(undefined)) {
    return next(createHttpError(400, "invalid answers data"));
  }

  serverHelper(async () => {
    const answerBaseData = {
      quiz: quizId,
      participant: userId,
    };

    let totalMarks = 0;
    let totalAnswers = 0;

    // TODO: add null answer
    const questionAnswers = await Promise.all(
      answers.map(async (answer) => {
        const questionType = answer.questionType;

        if (questionType === "multipleOption") {
          const questionData = await multipleOptionQuestion.findOne(
            { _id: answer._id },
            { correctAnswerIndex: 1, mark: 1 }
          );
          totalAnswers++;
          if (answer.answer === null) {
            return multipleOptionAnswer.create({
              ...answerBaseData,
              answerIndex: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (questionData.correctAnswerIndex === answer.answer) {
            totalMarks += questionData.mark;

            return multipleOptionAnswer.create({
              ...answerBaseData,
              answerIndex: answer.answer,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          } else {
            return multipleOptionAnswer.create({
              ...answerBaseData,
              answerIndex: answer.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }
        }

        if (questionType === "multipleAnswer") {
          const questionData = await multipleAnswerQuestion.findOne(
            { _id: answer._id },
            { correctAnswerIndices: 1, mark: 1 }
          );
          totalAnswers++;
          if (answer.answer === null) {
            return multipleAnswerAnswer.create({
              ...answerBaseData,
              answerIndices: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (
            questionData.correctAnswerIndices.length !== answer.answer.length
          ) {
            return multipleAnswerAnswer.create({
              ...answerBaseData,
              answerIndices: answer.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          const answerIndicesMatched = [];

          for (let i = 0; i < questionData.correctAnswerIndices.length; i++) {
            if (questionData.correctAnswerIndices[i] !== answer.answer[i]) {
              answerIndicesMatched.push(undefined);
            }
          }

          if (answerIndicesMatched.includes(undefined)) {
            return multipleAnswerAnswer.create({
              ...answerBaseData,
              answerIndices: answer.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          } else {
            totalMarks += questionData.mark;

            return multipleAnswerAnswer.create({
              ...answerBaseData,
              answerIndices: answer.answer,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          }
        }

        if (questionType === "textAnswer") {
          const questionData = await textAnswerQuestion.findOne(
            { _id: answer._id },
            { correctAnswer: 1, mark: 1 }
          );
          totalAnswers++;
          if (answer.answer === null) {
            return textAnswerAnswer.create({
              ...answerBaseData,
              answer: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (questionData.correctAnswer.length !== answer.answer.length) {
            return textAnswerAnswer.create({
              ...answerBaseData,
              answer: answer.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (questionData.correctAnswer !== answer.answer) {
            return textAnswerAnswer.create({
              ...answerBaseData,
              answer: answer.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          } else {
            totalMarks += questionData.mark;

            return textAnswerAnswer.create({
              ...answerBaseData,
              answer: answer.answer,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          }
        }

        if (questionType === "pinPointAnswer") {
          const questionData = await pinPointAnswerQuestion.findOne(
            { _id: answer._id },
            { correctPinPointAnswer: 1, mark: 1 }
          );
          totalAnswers++;
          if (answer.answer === null) {
            return pinPointAnswerAnswer.create({
              ...answerBaseData,
              answer: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (
            questionData.correctPinPointAnswer.x === answer.answer.x &&
            questionData.correctPinPointAnswer.y === answer.answer.y
          ) {
            totalMarks += questionData.mark;

            return pinPointAnswerAnswer.create({
              ...answerBaseData,
              answer: answer.answer,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          } else {
            return pinPointAnswerAnswer.create({
              ...answerBaseData,
              answer: answer.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }
        }
      })
    );

    const quizAnswer = await quizAnswerModel.create({
      quiz: quizId,
      participant: userId,
      classroom: classroomId,
      totalMarks,
      totalAnswers,
      answers: questionAnswers.map((answer) => answer._id),
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

    const successAnswers = questionAnswers.filter((answer) => answer.isCorrect);

    const failedAnswers = questionAnswers.filter((answer) => !answer.isCorrect);

    res.status(201).json({
      success: true,
      data: {
        totalQuestions: totalAnswers,
        totalMarks,
        successAnswers,
        failedAnswers,
      },
    });
  }, next);
}
