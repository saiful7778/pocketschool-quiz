import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { quizModel } from "../../../models/quizModel";

export default function quizController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const quizId = req.params.quizId;
  serverHelper(async () => {
    const quiz = await quizModel
      .findOne(
        {
          _id: quizId,
        },
        { title: 1, questions: 1, startTime: 1 }
      )
      .populate({
        path: "questions",
        select: [
          "questionText",
          "questionType",
          "timeLimit",
          "mark",
          "options",
        ],
      });

    res.status(200).json({ success: true, data: quiz });
  }, next);
}
