import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";

export default function classroomUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const classroomId = req.params.classroomId;
  const userId = req.query.userId as string;

  serverHelper(async () => {
    // find classroom data from classroom mongoose model and schema
    const classroom = await classroomModel
      .findOne(
        {
          _id: classroomId,
          "users.user": userId,
          "users.role": "admin",
          "users.access": true,
        },
        { users: 1 }
      )
      .populate({
        path: "users.user",
        model: "user",
        select: ["fullName", "email", "image"],
      });

    // send response
    res.status(200).json({
      success: true,
      data: classroom,
    });
  }, next);
}
