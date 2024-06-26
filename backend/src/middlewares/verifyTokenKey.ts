import type { Request, Response, NextFunction } from "express";
import devDebug from "../utils/devDebug";

/**
 * This middleware take token email and request query key email and try compare it
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns
 */
export default function verifyTokenAndKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.token;
  const { email } = req.query;

  if (!email) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    devDebug("query email is unavailable");
    return;
  }

  if (token?.email !== email) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    devDebug("token user email and query email is not match");
    return;
  }
  next();
}
