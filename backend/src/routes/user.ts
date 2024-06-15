import { Router } from "express";
import type { Request, Response } from "express";
import serverHelper from "../utils/serverHelper";
import inputCheck from "../utils/inputCheck";
import { userModel } from "../models/user";
import devDebug from "../utils/devDebug";
import { classroomModel } from "../models/classroom";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAndKey from "../middlewares/verifyTokenKey";

const route = Router();

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
    });
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
        });
        return;
      }

      res.status(200).send({
        success: true,
        data: user,
      });
    }, res);
  }
);

export { route as user };
