import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../../utils/serverHelper";
import { quizModel } from "../../../../models/quizModel";

export default function quizGetController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const quizId = req.params.quizId;

  serverHelper(async () => {
    const quiz = await quizModel
      .findOne({ _id: quizId }, { classroom: 0 })
      .populate({ path: "questions" })
      .populate({ path: "author", select: ["_id", "fullName", "email"] });

    res.status(200).send({ success: true, data: quiz });
  }, next);
}
