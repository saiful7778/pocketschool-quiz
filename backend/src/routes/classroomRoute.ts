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

// this instance for single classroom operation
const route = Router();
// this instance for all classrooms operation
const routeAll = Router();

/**
 * create a new classroom if requested user in admin or superAdmin
 */
route.post(
  "/",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  verifyAdminAndSuperAdmin,
  (req: Request, res: Response) => {
    // get data from request body
    const { title } = req.body;
    // get user id from verifyAdminAndSuperAdmin middleware
    const admin = req.userId;

    // check is all data available or not
    const check = inputCheck([title], res);
    if (!check) return;

    serverHelper(async () => {
      // create a new classroom using classroom mongoose model
      await classroomModel.create({
        title,
        admins: [{ userId: admin, access: true }],
      });

      devDebug("new classroom created");

      // send response data
      res.status(201).send({
        success: true,
        message: "classroom is created",
      } as ApiResponseMessage);
    }, res);
  }
);

/**
 * join a new classroom
 */
route.post(
  "/join/:classroomId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    // get classroomId from request params
    const classroomId = req.params.classroomId;
    // get userId from verifyUserExist middleware
    const { userId } = req.user;

    serverHelper(async () => {
      // add user to a classroom
      await classroomModel.updateOne(
        { _id: classroomId },
        { users: [{ userId, access: false }] },
        { upsert: true }
      );

      devDebug("joined classroom");

      // send response
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
    // get classroomId from request params
    const classroomId = req.params.classroomId;
    // get userId data from verifyUserExist middleware
    const { userId } = req.user;

    serverHelper(async () => {
      // get classroom data by mongodb aggregation pipeline
      const classroom = await classroomModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(classroomId),
            // check if userId exist in this classroom admin or user array also her access should be true
            $or: [
              { "admins.userId": userId, "admins.access": true },
              { "users.userId": userId, "users.access": true },
            ],
          },
        },
        {
          // add a new role field of user in admin or user
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
          // exclude admins, users and __v field
          $project: {
            admins: 0,
            users: 0,
            __v: 0,
          },
        },
      ]);

      // send classroom data
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
    // get classroomId data from request params
    const classroomId = req.params.classroomId;
    // get userId from verifyUserExist middleware
    const { userId } = req.user;

    serverHelper(async () => {
      // find classroom data from classroom mongoose model and schema
      const classroom = await classroomModel
        .findOne({
          _id: classroomId,
          // userId should be classroom admin and her access should be true to proceed the next steps
          "admins.userId": userId,
          "admins.access": true,
        })
        // get all classrooms admins details like fullName, email and image
        .populate({
          path: "admins.userId",
          select: ["fullName", "email", "image"],
        })
        // get all classrooms users details like fullName, email and image
        .populate({
          path: "users.userId",
          select: ["fullName", "email", "image"],
        });

      // send classroom data as response
      res.status(200).send({
        success: true,
        data: classroom,
      } as ApiResponseData<Classroom>);
    }, res);
  }
);

/**
 * update classroom user or admin access and role
 */
route.patch(
  "/:classroomId/user/:classroomUserId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  (req: Request, res: Response) => {
    // get classroomId from request params
    const classroomId = req.params.classroomId;
    // get classroomUserId from request params
    const classroomUserId = req.params.classroomUserId;

    // get userId data from verifyUserExist middleware
    const { userId } = req.user;

    // get all date from request body
    const { access, role } = req.body;

    // check all data are available or not
    const check = inputCheck([access], res);
    if (!check) return;

    // protect request user to update her account details
    if (userId.toString() === classroomUserId) {
      res.status(400).send({
        success: false,
        message: "You can't update your role or access",
      } as ApiResponseMessage);
      return;
    }

    serverHelper(async () => {
      // update classroom user data using classroom mongoose model and schema
      const classroom = await classroomModel.updateOne(
        {
          _id: classroomId,
          // check if requested user admin and her access true in this classroom
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
            { "user.userId": classroomUserId },
            { "admin.userId": classroomUserId },
          ],
        }
      );

      if (typeof role !== "undefined") {
        if (role === "user") {
          await classroomModel.updateOne(
            {
              _id: classroomId,
              // check if requested user admin and her access true in this classroom
              "admins.userId": userId,
              "admins.access": true,
            },
            {
              $pull: {
                admins: { userId: classroomUserId },
              },
              $push: {
                users: { userId: classroomUserId, access },
              },
            }
          );
        } else if (role === "admin") {
          await classroomModel.updateOne(
            {
              _id: classroomId,
              // check if requested user admin and her access true in this classroom
              "admins.userId": userId,
              "admins.access": true,
            },
            {
              $pull: {
                users: { userId: classroomUserId },
              },
              $push: {
                admins: { userId: classroomUserId, access },
              },
            }
          );
        }
      }

      // send classroom data as response
      res.status(200).send({
        success: true,
        data: classroom,
      } as unknown as ApiResponseData<Classroom>);
    }, res);
  }
);

/**
 * get all joind classrooms
 */
routeAll.get(
  "/joined",
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
