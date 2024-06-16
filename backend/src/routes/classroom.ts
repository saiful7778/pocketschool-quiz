import { Router } from "express";
import type { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAndKey from "../middlewares/verifyTokenKey";
import verifyUserExist from "../middlewares/verifyUserExist";
import inputCheck from "../utils/inputCheck";
import serverHelper from "../utils/serverHelper";
import { classroomModel } from "../models/classroom";
import {
  ApiResponseData,
  ApiResponseMessage,
  Classroom,
} from "../types/apiResponses";
import devDebug from "../utils/devDebug";
import verifyAdminAndSuperAdmin from "../middlewares/verifyAdminAndSuperAdmin";

const route = Router();
const routeAll = Router();

/**
 * create classroom
 */
route.post(
  "/",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  verifyAdminAndSuperAdmin,
  (req: Request, res: Response) => {
    const { title } = req.body;
    const admin = req.userId;
    const check = inputCheck([title], res);
    if (!check) {
      return;
    }
    serverHelper(async () => {
      await classroomModel.create({ title, admins: [admin] });

      devDebug("new classroom created");

      res.status(201).send({
        success: true,
        message: "classroom is created",
      } as ApiResponseMessage);
    }, res);
  }
);

/**
 * join classroom
 */
route.post(
  "/:classroomId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    const classroomId = req.params.classroomId;
    const { userId } = req.user;

    serverHelper(async () => {
      await classroomModel.updateOne(
        { _id: classroomId },
        { users: [userId] },
        { upsert: true }
      );

      devDebug("joined classroom");

      res.status(201).send({
        success: true,
        message: "Joined in a classroom",
      } as ApiResponseMessage);
    }, res);
  }
);

/**
 * get all added classrooms
 */
routeAll.get(
  "/added",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    const { userId } = req.user;
    serverHelper(async () => {
      const classroomsData = await classroomModel
        .find(
          {
            $or: [{ admins: [userId] }, { users: [userId] }],
          },
          { __v: 0 }
        )
        .populate({ path: "admins", select: ["_id"] })
        .populate({ path: "users", select: ["_id"] });

      const classrooms = classroomsData.map((classroom) => {
        return {
          _id: classroom._id,
          title: classroom.title,
          admin: classroom.admins.find(
            (admin) => admin._id.toString() === userId.toString()
          )
            ? true
            : false,
          user: classroom.users.find(
            (user) => user._id.toString() === userId.toString()
          )
            ? true
            : false,
          createdAt: classroom.createdAt,
          updatedAt: classroom.updatedAt,
        };
      });

      res.status(200).send({
        success: true,
        data: classrooms,
      } as unknown as ApiResponseData<Classroom>);
    }, res);
  }
);

export default routeAll;
export { route as classroom };
