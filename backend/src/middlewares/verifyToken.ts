import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import devDebug from "../utils/devDebug";
import getEnv from "../utils/env";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("authorization headers is unavailable");
    return;
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("authorization token is unavailable");
    return;
  }
  // eslint-disable-next-line no-undef
  jwt.verify(token, getEnv("accessToken"), (err, decode) => {
    if (err) {
      res.status(401).send({ success: false, message: "Unauthorized" });
      devDebug("token is not valid");
      return;
    }
    req.user = decode;
    next();
  });
}
