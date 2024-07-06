import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";
import { Types } from "mongoose";

export default function classroomUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const classroomId = req.params.classroomId;
  const userId = req.query.userId as string;

  const { title } = req.body;

  const check = inputCheck([title], next);
  if (!check) return;

  serverHelper(async () => {
    const classroom = await classroomModel.updateOne(
      {
        _id: new Types.ObjectId(classroomId),
        "users.user": userId,
        "users.role": "admin",
        "users.access": true,
      },
      { title }
    );

    res.status(200).json({
      success: true,
      data: classroom,
    });
  }, next);
}
