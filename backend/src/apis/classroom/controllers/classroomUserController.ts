import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";

// TODO: update this
export default function classroomUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const classroomId = req.params.classroomId;
  const classroomUserId = req.params.classroomUserId;

  serverHelper(async () => {
    const classroomUser = await classroomModel.findOne(
      {
        _id: classroomId,
        "users.user": classroomUserId,
        "users.access": true,
        "users.role": "admin",
      },
      { users: 1 }
    );

    // send response
    res.status(200).json({
      success: true,
      data: classroomUser,
    });
  }, next);
}
