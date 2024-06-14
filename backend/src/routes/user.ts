import { Router } from "express";
import type { Request, Response } from "express";
import serverHelper from "../utils/serverHelper";
import inputCheck from "../utils/inputCheck";
import { userModel } from "../models/user";
import devDebug from "../utils/devDebug";
import { classroomModel } from "../models/classroom";

const route = Router();

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

export { route as user };
