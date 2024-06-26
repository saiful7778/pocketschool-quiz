import devDebug from "../utils/devDebug";
import type { Request, Response, NextFunction } from "express";

/**
 * This middleware take userId and role from verifyUserExist middleware then verify is role is admin or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns userId by `req.userId`
 */
export default async function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role, userId } = req.user;
  if (role !== "admin") {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    devDebug("User is not admin");
    return;
  }
  req.userId = userId;
  next();
}
