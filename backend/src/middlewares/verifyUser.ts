import type { Request, Response, NextFunction } from "express";
import type { User } from "../types/user.type";
import { userModel } from "../models/user.model";
import createHttpError from "http-errors";

/**
 * This middleware take userId from request query key and verify is user exist or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns user Id and role by `req.user` `{userId: existUser._id, role: existUser.role}`
 */
export default function verifyUser(userRole: User["role"][]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { userId } = req.query;
    if (!userId) {
      return next(createHttpError(401, "userId is unavailable"));
    }

    try {
      const existUser = await userModel.findOne(
        { _id: userId },
        { _id: 1, role: 1, access: 1 }
      );

      if (!existUser) {
        return next(createHttpError(401, "user doesn't exist"));
      }

      if (!existUser.access) {
        return next(createHttpError(403, "user haven't access"));
      }

      if (!userRole.includes(existUser.role)) {
        return next(createHttpError(403, "user haven't access role"));
      }

      req.userId = existUser._id;
      next();
    } catch {
      return next(createHttpError(401, "user findOne error in verifyUser"));
    }
  };
}
