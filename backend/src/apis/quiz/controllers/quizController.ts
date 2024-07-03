import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { quizAnswerModel, quizModel } from "../../../models/quiz.model";

export default function quizController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const quizId = req.params.quizId;
  const { userId } = req.query;

  serverHelper(async () => {
    const quizResult = await quizAnswerModel
      .findOne({
        quiz: quizId,
        participant: userId,
      })
      .populate({
        path: "answers",
        select: ["_id", "isCorrect", "mark", "anwerType", "answerIndex"],
        populate: { path: "question", select: ["_id", "questionText"] },
      });

    if (quizResult) {
      res.status(200).json({
        success: true,
        data: {
          participated: true,
          data: quizResult,
        },
      });
      return;
    }

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

    res
      .status(200)
      .json({ success: true, data: { participated: false, data: quiz } });
  }, next);
}
