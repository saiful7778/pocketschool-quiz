import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import type {
  AnswerBase,
  MultipleAnswerAnswer,
  MultipleOptionAnswer,
  PinPointAnswerAnswer,
  TextAnswerAnswer,
} from "../../../types/question.type";
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
    return next(createHttpError(400, "invalid answers data"));
  }

  serverHelper(async () => {
    const answerBaseData = {
      quiz: quizId,
      participant: userId,
    };

    let totalMarks = 0;
    let totalAnswers = 0;

    const questionAnswers = await Promise.all(
      answers.map(async (answer) => {
        const answerType = answer.answerType;

        if (answerType === "multipleOptionAnswer") {
          const questionData = await multipleOptionQuestion.findOne(
            { _id: answer._id },
            { correctAnswerIndex: 1, mark: 1 }
          );
          totalAnswers++;
          const answerData = answer as MultipleOptionAnswer;

          if (answerData.answerIndex === null) {
            return multipleOptionAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answerIndex: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (questionData.correctAnswerIndex === answerData.answerIndex) {
            totalMarks += questionData.mark;

            return multipleOptionAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answerIndex: answerData.answerIndex,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          } else {
            return multipleOptionAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answerIndex: answerData.answerIndex,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }
        }

        if (answerType === "multipleAnswerAnswer") {
          const questionData = await multipleAnswerQuestion.findOne(
            { _id: answer._id },
            { correctAnswerIndices: 1, mark: 1 }
          );
          totalAnswers++;
          const answerData = answer as MultipleAnswerAnswer;
          if (answerData.answerIndices === null) {
            return multipleAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answerIndices: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (
            questionData.correctAnswerIndices.length !==
            answerData.answerIndices.length
          ) {
            return multipleAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answerIndices: answerData.answerIndices,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          const answerIndicesMatched = [];

          for (let i = 0; i < questionData.correctAnswerIndices.length; i++) {
            if (
              questionData.correctAnswerIndices[i] !==
              answerData.answerIndices[i]
            ) {
              answerIndicesMatched.push(undefined);
            }
          }

          if (answerIndicesMatched.includes(undefined)) {
            return multipleAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answerIndices: answerData.answerIndices,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          } else {
            totalMarks += questionData.mark;

            return multipleAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answerIndices: answerData.answerIndices,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          }
        }

        if (answerType === "textAnswerAnswer") {
          const questionData = await textAnswerQuestion.findOne(
            { _id: answer._id },
            { correctAnswer: 1, mark: 1 }
          );
          totalAnswers++;
          const answerData = answer as TextAnswerAnswer;
          if (answerData.answer === null) {
            return textAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answer: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (questionData.correctAnswer.length !== answerData.answer.length) {
            return textAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answer: answerData.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (questionData.correctAnswer !== answerData.answer) {
            return textAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answer: answerData.answer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          } else {
            totalMarks += questionData.mark;

            return textAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answer: answerData.answer,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          }
        }

        if (answerType === "pinPointAnswerAnswer") {
          const questionData = await pinPointAnswerQuestion.findOne(
            { _id: answer._id },
            { correctPinPointAnswer: 1, mark: 1 }
          );
          totalAnswers++;
          const answerData = answer as PinPointAnswerAnswer;
          if (answerData.pinPointAnswer === null) {
            return pinPointAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answer: null,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }

          if (
            questionData.correctPinPointAnswer.x ===
              answerData.pinPointAnswer.x &&
            questionData.correctPinPointAnswer.y === answerData.pinPointAnswer.y
          ) {
            totalMarks += questionData.mark;

            return pinPointAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answer: answerData.pinPointAnswer,
              question: questionData._id,
              isCorrect: true,
              mark: questionData.mark,
            });
          } else {
            return pinPointAnswerAnswer.create({
              ...answerBaseData,
              index: answerData.index,
              answer: answerData.pinPointAnswer,
              question: questionData._id,
              isCorrect: false,
              mark: 0,
            });
          }
        }
      })
    );

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
      totalMarks,
      totalAnswers,
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
        totalQuestions: totalAnswers,
        totalMarks,
        successAnswers,
        failedAnswers,
      },
    });
  }, next);
}
