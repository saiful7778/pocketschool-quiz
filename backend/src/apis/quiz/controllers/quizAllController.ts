import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { quizModel } from "../../../models/quizModel";
import createHttpError from "http-errors";
import { Types } from "mongoose";

export default function quizAllController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { classroomId } = req.query as { classroomId: string };

  if (!classroomId) {
    return next(createHttpError(400, "classroomId not found"));
  }

  serverHelper(async () => {
    const quizzes = await quizModel.aggregate([
      {
        $match: {
          classroom: new Types.ObjectId(classroomId),
        },
      },
      {
        $addFields: {
          questionsCount: { $size: "$questions" },
        },
      },
      {
        $project: { title: 1, questionsCount: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: quizzes,
    });
  }, next);
}
