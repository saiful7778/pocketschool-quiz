import type { Request, Response } from "express";
import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroomModel";
import { Types } from "mongoose";

export default function classroomUserUpdateController(
  req: Request,
  res: Response
) {
  // get data
  const classroomId = req.params.classroomId;
  const classroomUserId = req.params.classroomUserId;
  const userId = req.query.userId as string;
  const { access, role } = req.body;

  // validate
  const check = inputCheck([access], res);
  if (!check) return;

  // validate
  if (userId === classroomUserId) {
    res.status(400).json({
      success: false,
      message: "You can't update your role or access",
    });
    return;
  }

  serverHelper(async () => {
    // update classroom user data using classroom mongoose model and schema
    const classroom = await classroomModel.updateOne(
      {
        _id: new Types.ObjectId(classroomId),
        "admins.userId": userId,
        "admins.access": true,
      },
      {
        $set: {
          "users.$[user].access": access,
          "admins.$[admin].access": access,
        },
      },
      {
        arrayFilters: [
          { "user.userId": classroomUserId },
          { "admin.userId": classroomUserId },
        ],
      }
    );

    if (!classroom) {
      res.status(404).json({
        success: false,
        message: "Classroom not found",
      });
      return;
    }

    if (typeof role !== "undefined") {
      if (role === "user") {
        await classroomModel.updateOne(
          {
            _id: new Types.ObjectId(classroomId),
            "admins.userId": userId,
            "admins.access": true,
          },
          {
            $pull: {
              admins: { userId: classroomUserId },
            },
            $push: {
              users: { userId: classroomUserId, access },
            },
          }
        );
      } else if (role === "admin") {
        await classroomModel.updateOne(
          {
            _id: classroomId,
            // check if requested user admin and her access true in this classroom
            "admins.userId": userId,
            "admins.access": true,
          },
          {
            $pull: {
              users: { userId: classroomUserId },
            },
            $push: {
              admins: { userId: classroomUserId, access },
            },
          }
        );
      }
    }

    // send response
    res.status(200).json({
      success: true,
      data: classroom,
    });
  }, res);
}
