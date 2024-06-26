import type { Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroomModel";
import devDebug from "../../../utils/devDebug";
import { Types } from "mongoose";

export default function userJoinClassroomController(
  req: Request,
  res: Response
) {
  // get data
  const classroomId = req.params.classroomId;
  const { userId } = req.user;

  serverHelper(async () => {
    const isUserExist = await classroomModel.findOne({
      _id: new Types.ObjectId(classroomId),
      $or: [{ "admins.userId": userId }, { "users.userId": userId }],
    });

    if (isUserExist) {
      res.status(400).json({
        success: false,
        message: "User already joined",
      });
      return;
    }

    // add user to a classroom
    const classroom = await classroomModel.updateOne(
      { _id: new Types.ObjectId(classroomId) },
      { users: [{ userId, access: false }] }
    );

    if (classroom.modifiedCount === 0) {
      res
        .status(400)
        .json({ success: false, message: "user can't join in this classroom" });
      return;
    }

    devDebug("joined classroom");

    // send response
    res.status(201).json({
      success: true,
      message: "Joined in a classroom",
    });
  }, res);
}
