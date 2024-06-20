import { Router } from "express";
import type { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAndKey from "../middlewares/verifyTokenKey";
import verifyUserExist from "../middlewares/verifyUserExist";
import serverHelper from "../utils/serverHelper";
import inputCheck from "../utils/inputCheck";
import { ApiResponseMessage } from "../types/apiResponses";
import { classroomModel } from "../models/classroomModel";
import devDebug from "../utils/devDebug";
import {
  multipleAnswersQuestion,
  multipleOptionsQuestion,
  pinPointerAnswerQuestion,
  quizModel,
  textAnswerQuestion,
} from "../models/quizModel";
import { Types } from "mongoose";

const route = Router();

const quizData = {
  title: "Quiz title",
  startTime: "2024-06-20T17:50",
  questions: [
    {
      questionText: "Simple question",
      timeLimit: 30,
      marks: 30,
      questionType: "multipleAnswers",
      options: [
        { text: "option-1" },
        { text: "option-2" },
        { text: "option-3" },
      ],
      correctAnswerIndices: [1, 2],
    },
    {
      questionText: "how to print Hello world in cpp",
      timeLimit: 30,
      marks: 30,
      questionType: "textAnswer",
      correctAnswer: "dsf",
    },
  ],
};

/**
 * Create new quiz if request user is classroom admin
 */
route.post(
  "/:classroomId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    const classroomId = req.params.classroomId;
    const { userId } = req.user;
    const reqBody = req.body;
    const { title, questions, startTime } = reqBody;

    const check = inputCheck([title, questions, startTime], res);
    if (!check) return;

    if (!Array.isArray(questions)) {
      res.status(400).send({
        success: false,
        message: "Questions must be an array",
      } as ApiResponseMessage);
      devDebug("invalid questions");
      return;
    }

    const isQuestionsAvailable = questions.map((question) => {
      if (
        !question?.questionType ||
        !question?.questionText ||
        !question?.timeLimit ||
        !question?.marks
      ) {
        return undefined;
      }
      return question;
    });

    if (isQuestionsAvailable.includes(undefined)) {
      res.status(400).send({
        success: false,
        message: "Question data not available",
      } as ApiResponseMessage);
      devDebug("invalid question data");
      return;
    }

    serverHelper(async () => {
      const classroomAdmin = await classroomModel.findOne(
        {
          _id: classroomId,
          "admins.userId": userId,
          "admins.access": true,
        },
        { _id: 1 }
      );

      if (!classroomAdmin) {
        res.status(401).send({
          success: false,
          message: "You are not admin",
        } as ApiResponseMessage);
        devDebug("user not admin in this classroom");
        return;
      }

      const quizQuestions = await Promise.all(
        questions.map(async (question) => {
          switch (question.questionType) {
            case "multipleOption":
              return multipleOptionsQuestion.create(question);
            case "multipleAnswers":
              return multipleAnswersQuestion.create(question);
            case "textAnswer":
              return textAnswerQuestion.create(question);
            case "pinPointerAnswer":
              return pinPointerAnswerQuestion.create(question);
            default:
              throw new Error("Invalid question type");
          }
        })
      );

      const quiz = await quizModel.create({
        title,
        author: userId,
        classroom: classroomId,
        questions: quizQuestions,
        startTime,
      });

      res.status(201).send({
        success: true,
        message: "Quiz is created",
      } as ApiResponseMessage);
    }, res);
  }
);

/**
 * get all quizzes in classroom
 */
route.get(
  "/:classroomId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    const classroomId = req.params.classroomId;
    const { userId } = req.user;

    serverHelper(async () => {
      const quizzes = await quizModel.aggregate([
        {
          $match: {
            classroom: new Types.ObjectId(classroomId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
            pipeline: [
              {
                $project: {
                  fullName: 1,
                  email: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$author",
        },
        {
          $lookup: {
            from: "classrooms",
            localField: "classroom",
            foreignField: "_id",
            as: "classroom",
            pipeline: [
              {
                $project: {
                  admins: 1,
                  users: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$classroom",
        },
        {
          $match: {
            $or: [
              {
                "classroom.admins.userId": userId,
                "classroom.admins.access": true,
              },
              {
                "classroom.users.userId": userId,
                "classroom.users.access": true,
              },
            ],
          },
        },
        {
          $project: {
            classroom: 0,
            __v: 0,
            updatedAt: 0,
            questions: 0,
          },
        },
      ]);

      res.status(200).send({
        success: true,
        data: quizzes,
      });
    }, res);
  }
);

export { route as quiz };
