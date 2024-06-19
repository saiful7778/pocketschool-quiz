import { Router } from "express";
import type { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAndKey from "../middlewares/verifyTokenKey";
import verifyUserExist from "../middlewares/verifyUserExist";
import inputCheck from "../utils/inputCheck";
import serverHelper from "../utils/serverHelper";
import { classroomModel } from "../models/classroomModel";
import { ApiResponseData, ApiResponseMessage } from "../types/apiResponses";
import devDebug from "../utils/devDebug";
import verifyAdminAndSuperAdmin from "../middlewares/verifyAdminAndSuperAdmin";
import { Classroom } from "../types/classroom";
import { Types } from "mongoose";

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
    if (!check) return;

    serverHelper(async () => {
      await classroomModel.create({
        title,
        admins: [{ userId: admin, access: true }],
      });

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
  "/join/:classroomId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    const classroomId = req.params.classroomId;
    const { userId } = req.user;

    serverHelper(async () => {
      await classroomModel.updateOne(
        { _id: classroomId },
        { users: [{ userId, access: false }] },
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
 * get single classroom details
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
      const classroom = await classroomModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(classroomId),
            $or: [
              { "admins.userId": userId, "admins.access": true },
              { "users.userId": userId, "users.access": true },
            ],
          },
        },
        {
          $addFields: {
            role: {
              $cond: {
                if: { $in: [userId, "$admins.userId"] },
                then: "admin",
                else: {
                  $cond: {
                    if: { $in: [userId, "$users.userId"] },
                    then: "user",
                    else: null,
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            admins: 0,
            users: 0,
            __v: 0,
          },
        },
      ]);

      res.status(200).send({
        success: true,
        data: classroom[0],
      } as unknown as ApiResponseData<Classroom>);
    }, res);
  }
);

/**
 * get single classroom users and admin details
 */
route.get(
  "/:classroomId/admin",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    const classroomId = req.params.classroomId;
    const { userId } = req.user;

    serverHelper(async () => {
      const classroom = await classroomModel
        .findOne({
          _id: classroomId,
          "admins.userId": userId,
          "admins.access": true,
        })
        .populate({
          path: "admins.userId",
          select: ["fullName", "email", "image"],
        })
        .populate({
          path: "users.userId",
          select: ["fullName", "email", "image"],
        });

      res.status(200).send({
        success: true,
        data: classroom,
      } as ApiResponseData<Classroom>);
    }, res);
  }
);

/**
 * update classroom user
 */
route.patch(
  "/:classroomId/user/:userId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    const classroomId = req.params.classroomId;
    const classroomUserId = req.params.userId;
    const { userId } = req.user;
    const reqBody = req.body;
    const { access } = reqBody;

    const check = inputCheck([access], res);
    if (!check) return;

    if (userId.toString() === classroomUserId) {
      res.status(400).send({
        success: false,
        message: "You can't update your role or access",
      } as ApiResponseMessage);
      return;
    }

    serverHelper(async () => {
      const classroom = await classroomModel.updateOne(
        {
          _id: classroomId,
          "admins.userId": userId,
          "admins.access": true,
        },
        {
          $set: {
            "users.$[user].access": access,
            "admins.$[admin].access": access,
          },
        },
        {
          arrayFilters: [
            { "user._id": classroomUserId },
            { "admin._id": classroomUserId },
          ],
        }
      );

      res.status(200).send({
        success: true,
        data: classroom,
      } as unknown as ApiResponseData<Classroom>);
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
            $or: [
              { "admins.userId": userId, "admins.access": true },
              { "users.userId": userId, "users.access": true },
            ],
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
            (admin) => admin.userId.toString() === userId.toString()
          )
            ? true
            : false,
          user: classroom.users.find(
            (user) => user.userId.toString() === userId.toString()
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
      });
    }, res);
  }
);

export default routeAll;
export { route as classroom };
