import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/user.model";
import { classroomModel } from "../../../models/classroom.model";

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
        {
          $push: {
            users: {
              user: user._id,
              access: true,
            },
          },
        }
      );
    }

    // send response
    res.status(201).json({
      success: true,
      message: "user is created",
    });
  }, next);
}
