import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";
import { Types } from "mongoose";
import createHttpError from "http-errors";

export default function userJoinClassroomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const classroomId = req.params.classroomId;
  const { userId } = req.query;

  serverHelper(async () => {
    const isUserExist = await classroomModel.findOne(
      {
        _id: new Types.ObjectId(classroomId),
        "users.user": userId,
      },
      { _id: 1 }
    );

    if (isUserExist) {
      return next(createHttpError(400, "user is already joined"));
    }

    // add user to a classroom
    const classroom = await classroomModel.updateOne(
      { _id: new Types.ObjectId(classroomId) },
      {
        $push: {
          users: { user: userId, access: false },
        },
      }
    );

    if (classroom.modifiedCount === 0) {
      return next(createHttpError(400, "user can't join in this classroom"));
    }

    // send response
    res.status(201).json({
      success: true,
      message: "Joined in a classroom",
    });
  }, next);
}
