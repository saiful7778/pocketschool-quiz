import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../../utils/serverHelper";
import { quizModel } from "../../../../models/quiz.model";
import { Types } from "mongoose";

export default function quizGetAllController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const { classroomId } = req.query as { classroomId: string };

  serverHelper(async () => {
    const quizzes = await quizModel.aggregate([
      {
        $match: {
          classroom: new Types.ObjectId(classroomId),
        },
      },
      {
        $addFields: {
          participantCount: { $size: "$participants" },
        },
      },
      {
        $project: {
          classroom: 0,
          __v: 0,
          participants: 0,
          questions: 0,
          author: 0,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      data: quizzes,
    });
  }, next);
}
