import { userModel } from "../models/user";
import devDebug from "../utils/devDebug";
import type { Request, Response, NextFunction } from "express";

export default async function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.query?.userId;
  if (!userId) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("userId is unavailable");
    return;
  }

  try {
    const existUser = await userModel.findOne(
      { _id: userId },
      { _id: 1, role: 1 }
    );
    if (!existUser) {
      res.status(401).send({ success: false, message: "Unauthorized" });
      devDebug("User doesn't exist");
      return;
    }

    const isAdmin = existUser.role === "admin";
    if (!isAdmin) {
      res.status(401).send({ success: false, message: "Unauthorized" });
      devDebug("User is not admin");
      return;
    }
    req.userId = userId;
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("User query catch error in verifyUserID middleware");
    return;
  }
}
