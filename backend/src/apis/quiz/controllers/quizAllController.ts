import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { quizModel } from "../../../models/quiz.model";
import { Types } from "mongoose";

export default function quizAllController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { classroomId, userId } = req.query as {
    classroomId: string;
    userId: string;
  };

  serverHelper(async () => {
    const quizzes = await quizModel.aggregate([
      {
        $match: {
          classroom: new Types.ObjectId(classroomId),
        },
      },
      {
        $addFields: {
          newQuiz: {
            $cond: {
              if: {
                $in: [new Types.ObjectId(userId), "$participants"],
              },
              then: false,
              else: true,
            },
          },
        },
      },
      {
        $addFields: {
          questionsCount: { $size: "$questions" },
        },
      },
      {
        $project: {
          title: 1,
          questionsCount: 1,
          newQuiz: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: quizzes,
    });
  }, next);
}
