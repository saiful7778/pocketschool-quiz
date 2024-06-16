import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import devDebug from "../utils/devDebug";
import getEnv from "../utils/env";
import type { ApiResponseMessage } from "../types/apiResponses";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    res
      .status(401)
      .send({ success: false, message: "Unauthorized" } as ApiResponseMessage);
    devDebug("authorization headers is unavailable");
    return;
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    res
      .status(401)
      .send({ success: false, message: "Unauthorized" } as ApiResponseMessage);
    devDebug("authorization token is unavailable");
    return;
  }

  jwt.verify(
    token,
    getEnv("accessToken"),
    (err: jwt.VerifyErrors, decode: jwt.JwtPayload) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "Unauthorized",
        } as ApiResponseMessage);
        devDebug("token is not valid");
        return;
      }
      req.token = decode;
      next();
    }
  );
}
