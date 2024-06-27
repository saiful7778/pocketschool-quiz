import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

/**
 * This middleware take classroomUserRole from verifyClassroomUserAvailable middleware and check is user classroom role is admin or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns
 */
export default async function verifyClassroomAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const classroomUserRole = req.classroomUserRole;

  if (classroomUserRole !== "admin") {
    return next(createHttpError(401, "user not admin in this classroom"));
  }
  next();
}
