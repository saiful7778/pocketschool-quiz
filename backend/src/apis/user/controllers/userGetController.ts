import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/userModel";
import createHttpError from "http-errors";

export default function userGetController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;

  serverHelper(async () => {
    // find the user based on userId data and return only _id and role data
    const user = await userModel.findOne(
      { _id: userId },
      {
        role: 1,
      }
    );

    // check is user found or not
    if (!user) {
      return next(createHttpError(404, "user not found"));
    }

    // send response
    res.status(200).json({
      success: true,
      data: user,
    });
  }, next);
}
