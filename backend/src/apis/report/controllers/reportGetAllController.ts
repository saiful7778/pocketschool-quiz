import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { reportModel } from "../../../models/report.model";

export default function reportGetAllController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  serverHelper(async () => {
    const reports = await reportModel.find().populate({
      path: "user",
      model: "user",
      select: ["fullName", "email"],
    });

    res.status(200).json({
      success: true,
      data: reports,
    });
  }, next);
}
