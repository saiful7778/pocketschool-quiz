import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroom.model";

export default function classroomCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const admin = req.userId;
  const { title } = req.body;

  // check is all data available or not
  const check = inputCheck([title], next);
  if (!check) return;

  serverHelper(async () => {
    // create a new classroom using classroom mongoose model
    await classroomModel.create({
      title,
      users: { user: admin, role: "admin", access: true },
    });

    // send response data
    res.status(201).send({
      success: true,
      message: "classroom is created",
    });
  }, next);
}
