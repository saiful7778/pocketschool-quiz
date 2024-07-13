import { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { devMessageModel } from "../../../models/devMessage.model";
import type { DevMessage } from "../../../types/devMessage.type";
import inputCheck from "../../../utils/inputCheck";

export default function devMessageCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.query as { userId: string };
  const { title, category, message } = req.body as {
    title: DevMessage["title"];
    category: DevMessage["category"];
    message: DevMessage["message"];
  };

  const check = inputCheck([title, category, message], next);
  if (!check) return;

  serverHelper(async () => {
    const devMessage = await devMessageModel.create({
      user: userId,
      title,
      category,
      message,
    });

    res.status(201).json({ success: true, data: devMessage });
  }, next);
}
