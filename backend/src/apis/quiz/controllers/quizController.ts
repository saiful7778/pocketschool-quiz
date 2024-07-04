import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { quizAnswerModel, quizModel } from "../../../models/quiz.model";
import { Types } from "mongoose";

export default function quizController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const quizId = req.params.quizId;
  const { userId } = req.query;

  serverHelper(async () => {
    const quizResult = await quizAnswerModel.aggregate([
      {
        $match: {
          quiz: new Types.ObjectId(quizId),
          participant: new Types.ObjectId(userId as string),
        },
      },
      {
        $lookup: {
          from: "answers",
          localField: "answers",
          foreignField: "_id",
          as: "answers",
          pipeline: [
            {
              $project: {
                quiz: 0,
                participant: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$answers",
      },
      {
        $lookup: {
          from: "questions",
          localField: "answers.question",
          foreignField: "_id",
          as: "answers.question",
          pipeline: [
            {
              $project: {
                questionType: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$answers.question",
      },
      {
        $group: {
          _id: "$_id",
          quiz: { $first: "$quiz" },
          answers: { $push: "$answers" },
          totalMarks: { $first: "$totalMarks" },
          totalAnswers: { $first: "$totalAnswers" },
        },
      },
    ]);

    if (quizResult && quizResult.length > 0) {
      res.status(200).json({
        success: true,
        data: {
          participated: true,
          data: quizResult[0],
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
