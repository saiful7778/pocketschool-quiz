import createHttpError from "http-errors";
import type { Request, Response, NextFunction } from "express";

/**
 * This middleware take userId and role from verifyUserExist middleware then verify is role is superAdmin or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns userId by `req.userId`
 */
export default async function verifySuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role, userId } = req.user;
  if (role !== "superAdmin") {
    return next(createHttpError(401, "user is not super admin"));
  }
  req.userId = userId;
  next();
}
