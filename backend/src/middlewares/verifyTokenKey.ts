import type { Request, Response, NextFunction } from "express";
import devDebug from "../utils/devDebug";

export default function verifyTokenAndKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenUser = req.user;
  const keyEmail = req.query?.email;
  if (!keyEmail) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("query email is unavailable");
    return;
  }
  if (tokenUser?.email !== keyEmail) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("token user email and query email is not match");
    return;
  }
  next();
}
