import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../../utils/serverHelper";
import { quizModel } from "../../../../models/quiz.model";
import { questionModel } from "../../../../models/question.model";
import type { QuestionBase } from "../../../../types/question.type";
import { Types } from "mongoose";
import createHttpError from "http-errors";

export default function quizUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const quizId = req.params.quizId;
  const { title, startTime, questions } = req.body as {
    title: string;
    startTime: Date;
    questions: QuestionBase[];
  };

  if (!Array.isArray(questions)) {
    return next(createHttpError(400, "questions must be an array"));
  }

  if (questions.length === 0) {
    return next(createHttpError(400, "question array is empty"));
  }

  const isQuestionsAvailable = questions.map((question) => {
    if (
      !question?.questionType ||
      !question?.title ||
      !question?.timeLimit ||
      !question?.mark
    ) {
      return undefined;
    }
    return question;
  });

  if (isQuestionsAvailable.includes(undefined)) {
    return next(createHttpError(400, "invalid questions data"));
  }

  serverHelper(async () => {
    const quizData = (await quizModel.findOne(
      { _id: quizId },
      { questions: 1 }
    )) as { _id: string; questions: QuestionBase[] };

    const questionIds = await questionPromises(questions, quizData.questions);

    const quiz = await quizModel.updateOne(
      {
        _id: quizId,
      },
      {
        title,
        startTime,
        questions: questionIds,
      }
    );

    res.status(200).send({ success: true, data: quiz });
  }, next);
}

async function questionPromises(
  questions: QuestionBase[],
  quizQuestions: QuestionBase[]
) {
  const allPromises = [];
  const ids: string[] = [];

  const deleteAbleQuestions = quizQuestions.filter((questionId) =>
    questions.find((question) => String(questionId) === question?._id)
      ? false
      : true
  );

  if (deleteAbleQuestions.length > 0) {
    allPromises.push(
      ...deleteAbleQuestions.map((deleteQuestion) =>
        questionModel.deleteOne({ _id: deleteQuestion })
      )
    );
  }

  // const updateAbleQuestions = quizQuestions.filter((questionId) =>
  //   questions.find((question) => String(questionId) === question?._id)
  //     ? true
  //     : false
  // );

  allPromises.push(
    ...questions.map((question) => {
      if (question?._id) {
        const { _id, ...questionData } = question;

        ids.push(_id as string);
        return questionModel.updateOne(
          { _id: new Types.ObjectId(_id) },
          { ...questionData }
        );
      } else {
        const newQuestionId = new Types.ObjectId();
        ids.push(String(newQuestionId));
        return questionModel.create({ _id: newQuestionId, ...question });
      }
    })
  );

  await Promise.all(allPromises);
  return ids;
}
