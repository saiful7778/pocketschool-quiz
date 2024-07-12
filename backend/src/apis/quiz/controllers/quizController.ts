import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { quizAnswerModel, quizModel } from "../../../models/quiz.model";
import { Types } from "mongoose";

class quizController {
  private async answerData(quizId: string, userId: string) {
    return quizAnswerModel.aggregate([
      {
        $match: {
          quiz: new Types.ObjectId(quizId),
          participant: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "answers",
          localField: "answers",
          foreignField: "_id",
          as: "answers",
          pipeline: [
            {
              $project: {
                quiz: 0,
                participant: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$answers",
      },
      {
        $lookup: {
          from: "questions",
          localField: "answers.question",
          foreignField: "_id",
          as: "answers.question",
          pipeline: [
            {
              $project: {
                questionType: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$answers.question",
      },
      {
        $group: {
          _id: "$_id",
          quiz: { $first: "$quiz" },
          answers: { $push: "$answers" },
          totalMarks: { $first: "$totalMarks" },
          totalAnswers: { $first: "$totalAnswers" },
        },
      },
    ]);
  }

  public getQuiz(req: Request, res: Response, next: NextFunction) {
    const quizId = req.params.quizId;
    const { userId } = req.query as { userId: string };

    serverHelper(async () => {
      const isParticipated = await quizAnswerModel.findOne({
        quiz: quizId,
        participant: userId,
      });

      if (isParticipated) {
        const quizResult = await this.answerData(quizId, userId);
        res.status(200).json({
          success: true,
          data: {
            participated: true,
            data: quizResult[0],
          },
        });
        return;
      }

      const quiz = await quizModel
        .findOne(
          {
            _id: quizId,
          },
          { title: 1, questions: 1, startTime: 1 }
        )
        .populate({
          path: "questions",
          select: [
            "index",
            "title",
            "questionType",
            "timeLimit",
            "mark",
            "options",
          ],
        });

      res
        .status(200)
        .json({ success: true, data: { participated: false, data: quiz } });
    }, next);
  }
}

const quiz = new quizController();

export default quiz.getQuiz.bind(quiz);
