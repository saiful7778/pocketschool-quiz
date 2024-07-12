import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../../utils/serverHelper";
import { quizModel } from "../../../../models/quiz.model";

export default function quizGetController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const quizId = req.params.quizId;

  serverHelper(async () => {
    const quiz = await quizModel
      .findOne({ _id: quizId }, { classroom: 0, __v: 0 })
      .populate({
        path: "author",
        model: "user",
        select: ["fullName", "email"],
      })
      .populate({ path: "questions", model: "question" })
      .populate({
        path: "participants.user",
        model: "user",
        select: ["fullName", "email"],
      })
      .populate({
        path: "participants.answer",
        model: "quiz-answer",
        select: ["totalMarks", "totalAnswers", "createdAt"],
      });

    res.status(200).send({ success: true, data: quiz });
  }, next);
}
