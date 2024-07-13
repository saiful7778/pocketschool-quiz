import type { Request, Response, NextFunction } from "express";
import type { ResponseType } from "../../../types/report.type";
import serverHelper from "../../../utils/serverHelper";
import { reportModel } from "../../../models/report.model";

export default function reportResponseCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reportId = req.params.reportId;
  const { userId } = req.query as { userId: string };
  const { message } = req.body as {
    message: ResponseType["message"];
  };

  serverHelper(async () => {
    const response = await reportModel.updateOne(
      {
        _id: reportId,
      },
      {
        $set: {
          response: {
            user: userId,
            message,
            close: true,
          },
        },
      }
    );

    res.status(201).json({
      success: true,
      data: response,
    });
  }, next);
}
