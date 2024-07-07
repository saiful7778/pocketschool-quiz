import type { Request, Response, NextFunction } from "express";
import serverHelper from "../../../utils/serverHelper";
import { quizAnswerModel, quizModel } from "../../../models/quiz.model";

export default function quizAllController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { classroomId, userId } = req.query as {
    classroomId: string;
    userId: string;
  };

  serverHelper(async () => {
    const quizzes = await quizModel.find({
      classroom: classroomId,
    });

    const newQuizzes = [];
    const answerQuizzes = [];

    for (const quiz of quizzes) {
      const isParticipated = quiz.participants.find(
        (participant) => String(participant.user) === userId
      );

      if (isParticipated) {
        const quizAnswer = await quizAnswerModel
          .findOne(
            {
              quiz: quiz._id,
              participant: userId,
            },
            { totalMarks: 1, totalAnswers: 1, quiz: 1, createdAt: 1 }
          )
          .populate({
            path: "quiz",
            model: "quiz",
            select: ["title", "totalMarks", "totalQuestions"],
          });
        answerQuizzes.push(quizAnswer);
      } else {
        newQuizzes.push({
          _id: quiz._id,
          title: quiz.title,
          totalQuestions: quiz.totalQuestions,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        newQuizzes,
        answerQuizzes,
      },
    });
  }, next);
}
