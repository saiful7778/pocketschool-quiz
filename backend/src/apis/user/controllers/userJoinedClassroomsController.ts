import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";

export default function userJoinedClassroomsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.query;

  serverHelper(async () => {
    const classrooms = await classroomModel.find(
      {
        "users.user": userId,
        "users.access": true,
      },
      { title: 1 }
    );

    res.status(200).json({ success: true, data: classrooms });
  }, next);
}
