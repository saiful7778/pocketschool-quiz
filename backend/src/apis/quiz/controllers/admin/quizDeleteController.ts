import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../../utils/serverHelper";
import { quizAnswerModel, quizModel } from "../../../../models/quiz.model";
import { answerModel, questionModel } from "../../../../models/question.model";

export default function quizDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get data
  const quizId = req.params.quizId;

  serverHelper(async () => {
    const quiz = await quizModel.findOne({ _id: quizId });

    if (!quiz) {
      res.status(404).json({ success: false, message: "not quiz found" });
      return;
    }

    const deleteQuiz = await quizModel.deleteOne({ _id: quizId });

    await questionModel.deleteMany({ _id: { $in: quiz.questions } });
    await quizAnswerModel.deleteOne({ quiz: quiz._id });
    await answerModel.deleteMany({ quiz: quiz._id });

    res.status(200).send({ success: true, data: deleteQuiz });
  }, next);
}
