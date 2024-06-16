import type { Request, Response, NextFunction } from "express";
import devDebug from "../utils/devDebug";
import type { ApiResponseMessage } from "../types/apiResponses";

export default function verifyTokenAndKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.token;
  const keyEmail = req.query?.email;
  if (!keyEmail) {
    res
      .status(401)
      .send({ success: false, message: "Unauthorized" } as ApiResponseMessage);
    devDebug("query email is unavailable");
    return;
  }
  if (token?.email !== keyEmail) {
    res
      .status(401)
      .send({ success: false, message: "Unauthorized" } as ApiResponseMessage);
    devDebug("token user email and query email is not match");
    return;
  }
  next();
}
