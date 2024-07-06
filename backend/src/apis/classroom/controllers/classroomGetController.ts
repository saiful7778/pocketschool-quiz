import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";
import { Types } from "mongoose";
import createHttpError from "http-errors";

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
      {
        // add a new role field of user in admin or user
        $addFields: {
          role: {
            $cond: {
              if: { $in: ["admin", "$users.role"] },
              then: "admin",
              else: {
                $cond: {
                  if: { $in: ["user", "$users.role"] },
                  then: "user",
                  else: null,
                },
              },
            },
          },
        },
      },
      {
        $project: {
          users: 0,
          __v: 0,
        },
      },
    ]);

    if (!classroom || classroom.length === 0) {
      return next(createHttpError(404, "classroom not found"));
    }

    // send response
    res.status(200).json({
      success: true,
      data: classroom[0],
    });
  }, next);
}
