import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

/**
 * This middleware take token email and request query key email and try compare it
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns
 */
export default function verifyTokenAndKey(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.token;
  const { email } = req.query;

  if (!email) {
    return next(createHttpError(401, "query email is unavailable"));
  }

  if (token?.email !== email) {
    return next(
      createHttpError(401, "token user email and query email is not match")
    );
  }
  next();
}
