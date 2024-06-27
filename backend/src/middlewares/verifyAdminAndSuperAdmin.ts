import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

/**
 * This middleware take userId and role from verifyUserExist middleware then verify is role is admin or superAdmin
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns userId by `req.userId`
 */
export default async function verifyAdminAndSuperAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { role, userId } = req.user;
  if (role === "user") {
    return next(createHttpError(401, "user is not admin"));
  }
  req.userId = userId;
  next();
}
