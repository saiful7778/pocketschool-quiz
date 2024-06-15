import type { ApiResponseMessage } from "../types/apiResponses";
import devDebug from "../utils/devDebug";
import type { Request, Response, NextFunction } from "express";

export default async function verifyAdminAndSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role, userId } = req.user;
  if (role === "user") {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    } as ApiResponseMessage);
    devDebug("User is not admin");
    return;
  }
  req.userId = userId;
  next();
}
