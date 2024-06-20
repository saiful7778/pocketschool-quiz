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

// this instance for single user operation
const route = Router();
// this instance for all users operation
const routeAll = Router();

/**
 * create a new user
 */
route.post("/", (req: Request, res: Response) => {
  const userData = req.body;
  // extract all of the user data from request body
  const { fullName, email, uid, classroomId, role, access } = userData;

  // checking all requested data are available or not
  const check = inputCheck([fullName, email, uid, role, access], res);
  if (!check) return;

  serverHelper(async () => {
    // create new user using user mongoose model and schema
    const user = await userModel.create({
      fullName,
      email,
      uid,
      role,
      access,
    });

    // if classroomId data available then add relation with classroom document
    if (typeof classroomId !== "undefined") {
      await classroomModel.updateOne(
        {
          _id: classroomId,
        },
        { users: [{ userId: user.id, access: true }] },
        { upsert: true }
      );
      devDebug("new user is connected by classroom");
    }

    devDebug("new user is created");

    // send response to the client
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
    // get userId data from request params /:userId
    const userId = req.params.userId;

    serverHelper(async () => {
      // find the user based on userId data and return only _id and role data
      const user = await userModel.findOne(
        { _id: userId },
        {
          role: 1,
        }
      );

      // check is user found or not
      if (!user) {
        res.status(404).send({
          success: false,
          message: "User not found",
        } as ApiResponseMessage);
        return;
      }

      // send user data
      res.status(200).send({
        success: true,
        data: user,
      } as ApiResponseData<{ role: User["role"] }>);
    }, res);
  }
);

/**
 * update user if requested user is super admin
 */
route.patch(
  "/:userId",
  verifyToken,
  verifyTokenAndKey,
  verifyUserExist,
  verifySuperAdmin,
  (req: Request, res: Response) => {
    // get user id data from request params
    const userId = req.params.userId;

    // get requested user(superAdminUserId) id
    const { userId: superAdminUserId } = req.user;

    // get only essential data from request body comes
    const { role, access } = req.body;

    // check if requested user don't update her account data
    if (superAdminUserId.toString() === userId) {
      res.status(400).send({
        success: false,
        message: "You can't update your role or access",
      } as ApiResponseMessage);
      return;
    }

    // check is all data available or not
    const check = inputCheck([role, access], res);
    if (!check) {
      return;
    }

    serverHelper(async () => {
      // update user data based on her userId
      const user = await userModel.updateOne({ _id: userId }, { role, access });

      // send user data as response
      res.status(200).send({
        success: true,
        data: user,
      } as unknown as ApiResponseData<User>);
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
      // get all user account data without __v
      const users = await userModel.find({}, { __v: 0 });

      // send all user data
      res
        .status(200)
        .send({ success: true, data: users } as ApiResponseData<User[]>);
    }, res);
  }
);

export default routeAll;
export { route as user };
