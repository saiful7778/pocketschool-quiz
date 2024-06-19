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

const route = Router();

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
        !question?.timeLimit
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
            case "multipleOptions":
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

      console.log(quiz);

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
      const quizzes = await quizModel
        .find({
          classroom: classroomId,
        })
        .populate({ path: "classroom" });

      res.status(200).send({
        success: true,
        data: quizzes,
      });
    }, res);
  }
);

export { route as quiz };
