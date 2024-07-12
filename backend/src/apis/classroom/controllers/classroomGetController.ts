import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";
import { Types } from "mongoose";

export default function classroomGetController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const classroomId = req.params.classroomId;
  const userId = req.query.userId as string;

  serverHelper(async () => {
    // get classroom data by mongodb aggregation pipeline

    const classroom = await classroomModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(classroomId),
          "users.user": new Types.ObjectId(userId),
          "users.access": true,
        },
      },
      { $unwind: "$users" },
      {
        $match: {
          "users.user": new Types.ObjectId(userId),
          "users.access": true,
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);

    // send response
    res.status(200).json({
      success: true,
      data: classroom[0],
    });
  }, next);
}
