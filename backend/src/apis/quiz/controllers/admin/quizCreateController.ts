import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../../utils/inputCheck";
import serverHelper from "../../../../utils/serverHelper";
// models
import { quizModel } from "../../../../models/quiz.model";
import {
  multipleOptionQuestion,
  multipleAnswerQuestion,
  textAnswerQuestion,
  pinPointAnswerQuestion,
} from "../../../../models/question.model";
import type { QuestionBase } from "../../../../types/question.type";
import createHttpError from "http-errors";

export default function quizCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const { userId, classroomId } = req.query as {
    userId: string;
    classroomId: string;
  };
  const { title, questions, startTime } = req.body as {
    title: string;
    startTime: Date;
    questions: QuestionBase[];
  };

  // validate
  const check = inputCheck([title, questions, startTime], next);
  if (!check) return;

  if (!Array.isArray(questions)) {
    return next(createHttpError(400, "questions must be an array"));
  }

  if (questions.length === 0) {
    return next(createHttpError(400, "question array is empty"));
  }

  const isQuestionsAvailable = questions.map((question) => {
    if (
      !question?.questionType ||
      !question?.questionText ||
      !question?.timeLimit ||
      !question?.mark
    ) {
      return undefined;
    }
    return question;
  });

  if (isQuestionsAvailable.includes(undefined)) {
    return next(createHttpError(400, "invalid questions data"));
  }

  serverHelper(async () => {
    const quizQuestions = await Promise.all(
      questions.map(async (question) => {
        switch (question.questionType) {
          case "multipleOption":
            return multipleOptionQuestion.create(question);
          case "multipleAnswer":
            return multipleAnswerQuestion.create(question);
          case "textAnswer":
            return textAnswerQuestion.create(question);
          case "pinPointAnswer":
            return pinPointAnswerQuestion.create(question);
          default:
            throw new Error("Invalid question type");
        }
      })
    );

    await quizModel.create({
      title,
      author: userId,
      classroom: classroomId,
      questions: quizQuestions.map((question) => question._id),
      startTime,
    });

    res.status(201).send({
      success: true,
      message: "Quiz is created",
    });
  }, next);
}
