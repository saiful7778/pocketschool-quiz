import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import inputCheck from "../utils/inputCheck";
import serverHelper from "../utils/serverHelper";
import { userModel } from "../models/user";
import getEnv from "../utils/env";
import devDebug from "../utils/devDebug";
import type {
  ApiResponseMessage,
  LoginUserDataResponse,
} from "./../../types/apiResponses";

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
        role: 1,
        uid: 1,
        access: 1,
      }
    );
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User doesn't exist",
      } as ApiResponseMessage);
      devDebug("User doesn't exist");
      return;
    }

    if (!user.access) {
      res.status(400).send({
        success: false,
        message: "User can't access this site",
      } as ApiResponseMessage);
      devDebug("User can't access this site");
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: email,
        role: user.role,
        uid: user.uid,
      },
      getEnv("accessToken"),
      {
        expiresIn: "2h",
      }
    );
    devDebug("new token in generated");
    res.status(200).send({
      success: true,
      data: {
        token,
        userData: { id: user.id, role: user.role, uid: user.uid },
      },
    } as unknown as LoginUserDataResponse);
  }, res);
});

export { route as authentication };
