import { Router } from "express";
import type { Request, Response } from "express";
import serverHelper from "../utils/serverHelper";
import inputCheck from "../utils/inputCheck";
import { userModel } from "../models/userModel";
import devDebug from "../utils/devDebug";
import { classroomModel } from "../models/classroomModel";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAndKey from "../middlewares/verifyTokenKey";
import type {
  ApiResponseData,
  ApiResponseMessage,
} from "../types/apiResponses";
import verifyUserExist from "../middlewares/verifyUserExist";
import verifySuperAdmin from "../middlewares/verifySuperAdmin";
import { User } from "../types/user";

const route = Router();
const routeAll = Router();

/**
 * create a new user
 */
route.post("/", (req: Request, res: Response) => {
  const userData = req.body;
  const { fullName, email, uid, classroomId, role, access } = userData;

  const check = inputCheck([fullName, email, uid, role, access], res);

  if (!check) return;

  serverHelper(async () => {
    const user = await userModel.create({
      fullName,
      email,
      uid,
      role,
      access,
    });

    if (typeof classroomId !== "undefined") {
      await classroomModel.findByIdAndUpdate(
        classroomId,
        { users: [{ userId: user.id, access: true }] },
        { upsert: true }
      );
      devDebug("new user is connected by classroom");
    }

    devDebug("new user is created");

    res.status(201).send({
      success: true,
      message: "user is created",
    } as ApiResponseMessage);
  }, res);
});

/**
 * get single user data
 */
route.get(
  "/:userId",
  verifyToken,
  verifyTokenAndKey,
  (req: Request, res: Response) => {
    const userId = req.params.userId;

    serverHelper(async () => {
      const user = await userModel.findById(userId, {
        role: 1,
      });
      if (!user) {
        res.status(404).send({
          success: false,
          message: "User not found",
        } as ApiResponseMessage);
        return;
      }

      res.status(200).send({
        success: true,
        data: user,
      } as ApiResponseData<{ role: User["role"] }>);
    }, res);
  }
);

/**
 * update user if request user is super admin
 */
route.patch(
  "/:userId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  verifySuperAdmin,
  (req: Request, res: Response) => {
    const { userId: superAdminUserId } = req.user;
    const userId = req.params.userId;
    const { role, access } = req.body;

    if (superAdminUserId.toString() === userId) {
      res.status(400).send({
        success: false,
        message: "You can't update your role or access",
      } as ApiResponseMessage);
      return;
    }

    const check = inputCheck([role, access], res);
    if (!check) {
      return;
    }

    serverHelper(async () => {
      const user = await userModel.findByIdAndUpdate(userId, { role, access });

      res
        .status(200)
        .send({ success: true, data: user } as ApiResponseData<User>);
    }, res);
  }
);

/**
 * get all users if request user is super admin
 */
routeAll.get(
  "/all",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  verifySuperAdmin,
  (_req: Request, res: Response) => {
    serverHelper(async () => {
      const users = await userModel.find({}, { __v: 0 });

      res
        .status(200)
        .send({ success: true, data: users } as ApiResponseData<User[]>);
    }, res);
  }
);

export default routeAll;
export { route as user };
