import { Router } from "express";
import type { Request, Response } from "express";
import serverHelper from "../utils/serverHelper";
import inputCheck from "../utils/inputCheck";
import { userModel } from "../models/user";
import devDebug from "../utils/devDebug";
import { classroomModel } from "../models/classroom";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAndKey from "../middlewares/verifyTokenKey";
import type {
  ApiResponseData,
  ApiResponseMessage,
  UserData,
  UserDataResponse,
} from "../types/apiResponses";
import verifyUserExist from "../middlewares/verifyUserExist";
import verifySuperAdmin from "../middlewares/verifySuperAdmin";

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
        { users: [user.id] },
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
      } as ApiResponseData<{ role: UserDataResponse["role"] }>);
    }, res);
  }
);

route.patch(
  "/:userId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  verifySuperAdmin,
  (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { role, access } = req.body;

    const check = inputCheck([role, access], res);
    if (!check) {
      return;
    }

    serverHelper(async () => {
      const user = await userModel.findByIdAndUpdate(userId, { role, access });

      res
        .status(200)
        .send({ success: true, data: user } as ApiResponseData<UserData>);
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
        .send({ success: true, data: users } as unknown as ApiResponseData<
          UserData[]
        >);
    }, res);
  }
);

export default routeAll;
export { route as user };
