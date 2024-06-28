import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import getEnv from "../utils/env";
import createHttpError from "http-errors";

/**
 * This middleware take jwt token `Bearer {token}` Authorization request headers and verify it
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns jwt token by req.token
 */
export default function verifyToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const { email } = req.query;

  if (!authorization) {
    return next(createHttpError(401, "authorization headers is unavailable"));
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "authorization token is unavailable"));
  }

  if (!email) {
    return next(createHttpError(401, "query email is unavailable"));
  }

  // verify the jwt token
  jwt.verify(
    token,
    getEnv("accessToken"),
    (err: jwt.VerifyErrors, decode: jwt.JwtPayload) => {
      if (err) {
        return next(createHttpError(401, "token is not valid"));
      }
      // send this jwt token
      if (decode?.email !== email) {
        return next(
          createHttpError(401, "token user email and query email is not match")
        );
      }
      next();
    }
  );
}
