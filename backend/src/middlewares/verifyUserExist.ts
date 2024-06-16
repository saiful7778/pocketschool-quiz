import type { Request, Response, NextFunction } from "express";
import type { ApiResponseMessage } from "../types/apiResponses";
import devDebug from "../utils/devDebug";
import { userModel } from "../models/userModel";

export default async function verifyUserExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.query?.userId;
  if (!userId) {
    res
      .status(401)
      .send({ success: false, message: "Unauthorized" } as ApiResponseMessage);
    devDebug("userId is unavailable");
    return;
  }

  try {
    const existUser = await userModel.findOne(
      { _id: userId },
      { _id: 1, role: 1 }
    );
    if (!existUser) {
      res.status(401).send({
        success: false,
        message: "Unauthorized",
      } as ApiResponseMessage);
      devDebug("User doesn't exist");
      return;
    }

    req.user = { userId: existUser._id, role: existUser.role };
    next();
  } catch (err) {
    res
      .status(401)
      .send({ success: false, message: "Unauthorized" } as ApiResponseMessage);
    devDebug("User query catch error in verifyUserID middleware");
    return;
  }
}
