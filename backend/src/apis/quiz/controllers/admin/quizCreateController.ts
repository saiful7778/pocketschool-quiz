import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../../utils/inputCheck";
import serverHelper from "../../../../utils/serverHelper";
// models
import {
  multipleAnswersQuestion,
  multipleOptionsQuestion,
  pinPointerAnswerQuestion,
  quizModel,
  textAnswerQuestion,
} from "../../../../models/quizModel";
import type { Question } from "../../../../types/quizType";
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
    questions: Question[];
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
      !question?.marks
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
            return multipleOptionsQuestion.create(question);
          case "multipleAnswers":
            return multipleAnswersQuestion.create(question);
          case "textAnswer":
            return textAnswerQuestion.create(question);
          case "pinPointerAnswer":
            return pinPointerAnswerQuestion.create(question);
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
