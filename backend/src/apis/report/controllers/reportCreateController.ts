import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { reportModel } from "../../../models/report.model";
import type { Report } from "../../../types/report.type";
import inputCheck from "../../../utils/inputCheck";

export default function reportCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.query as { userId: string };
  const { title, category, message } = req.body as {
    title: Report["title"];
    category: Report["category"];
    message: Report["message"];
  };

  const check = inputCheck([title, category, message], next);
  if (!check) return;

  serverHelper(async () => {
    const report = await reportModel.create({
      user: userId,
      title,
      category,
      message,
    });

    res.status(201).json({ success: true, data: report });
  }, next);
}
