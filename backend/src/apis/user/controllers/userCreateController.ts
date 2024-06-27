import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/userModel";
import { classroomModel } from "../../../models/classroomModel";

export default function userCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get the data
  const { fullName, email, uid, classroomId, role, access } = req.body;

  // validate the data
  const check = inputCheck([fullName, email, uid, role, access], next);
  if (!check) return;

  serverHelper(async () => {
    // create new user
    const user = await userModel.create({
      fullName,
      email,
      uid,
      role,
      access,
    });

    // join user to a classroom if classroomId is available
    if (typeof classroomId !== "undefined") {
      await classroomModel.updateOne(
        {
          _id: classroomId,
        },
        { users: [{ userId: user.id, access: true }] },
        { upsert: true }
      );
    }

    // send response
    res.status(201).json({
      success: true,
      message: "user is created",
    });
  }, next);
}
