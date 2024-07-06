import type { NextFunction, Request, Response } from "express";
import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/user.model";
import createHttpError from "http-errors";

export default function userUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;

  const superAdminUserId = req.userId;

  const { role, access } = req.body;

  // check if requested user don't update her account data
  if (superAdminUserId.toString() === userId) {
    return next(createHttpError("You can't update your role or access"));
  }

  // check is all data available or not
  const check = inputCheck([role, access], next);
  if (!check) return;

  serverHelper(async () => {
    // update user data based on her userId
    const user = await userModel.updateOne({ _id: userId }, { role, access });

    // send response
    res.status(200).json({
      success: true,
      data: user,
    });
  }, next);
}
