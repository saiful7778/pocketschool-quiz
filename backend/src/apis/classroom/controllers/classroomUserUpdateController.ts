import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";
import { Types } from "mongoose";
import createHttpError from "http-errors";

export default function classroomUserUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const classroomId = req.params.classroomId;
  const classroomUserId = req.params.classroomUserId;
  const userId = req.query.userId as string;
  const { access, role } = req.body;

  // validate
  const check = inputCheck([access], next);
  if (!check) return;

  // validate
  if (userId === classroomUserId) {
    return next(createHttpError("You can't update your role or access"));
  }

  serverHelper(async () => {
    // update classroom user data using classroom mongoose model and schema
    const classroom = await classroomModel.updateOne(
      {
        _id: new Types.ObjectId(classroomId),
        "users.user": userId,
        "users.role": "admin",
        "users.access": true,
      },
      {
        $set: {
          "users.$[user].access": access,
          "users.$[user].role": role,
        },
      },
      {
        arrayFilters: [{ "user.user": classroomUserId }],
      }
    );

    if (!classroom) {
      return next(createHttpError(404, "classroom not found"));
    }

    // send response
    res.status(200).json({
      success: true,
      data: classroom,
    });
  }, next);
}
