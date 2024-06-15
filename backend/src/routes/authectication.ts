import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import inputCheck from "../utils/inputCheck";
import serverHelper from "../utils/serverHelper";
import { userModel } from "../models/user";
import getEnv from "../utils/env";
import devDebug from "../utils/devDebug";

const route = Router();

route.post("/login", (req: Request, res: Response) => {
  const userData = req.body;
  const { email } = userData;

  const check = inputCheck([email], res);
  if (!check) {
    return;
  }

  serverHelper(async () => {
    const user = await userModel.findOne(
      { email },
      {
        email: 1,
        role: 1,
        uid: 1,
        access: 1,
      }
    );
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User doesn't exist",
      });
      devDebug("User doesn't exist");
      return;
    }

    if (!user.access) {
      res.status(400).send({
        success: false,
        message: "User can't access this site",
      });
      devDebug("User can't access this site");
      return;
    }

    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      uid: user.uid,
      access: user.access,
    };

    const token = jwt.sign(userData, getEnv("accessToken"), {
      expiresIn: "2h",
    });
    devDebug("new token in generated");
    res.status(200).send({ success: true, data: { token, userData } });
  }, res);
});

export { route as authentication };
