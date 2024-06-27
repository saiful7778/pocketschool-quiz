import type { Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel";
import createHttpError from "http-errors";

/**
 * This middleware take userId from request query key and verify is user exist or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns user Id and role by `req.user` `{userId: existUser._id, role: existUser.role}`
 */
export default async function verifyUserExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.query;
  if (!userId) {
    return next(createHttpError(401, "userId is unavailable"));
  }

  try {
    const existUser = await userModel.findOne(
      { _id: userId },
      { _id: 1, role: 1 }
    );
    if (!existUser) {
      return next(createHttpError(401, "user doesn't exist"));
    }

    req.user = { userId: existUser._id, role: existUser.role };
    next();
  } catch {
    return next(createHttpError(401, "user findOne error in verifyUserExist"));
  }
}
