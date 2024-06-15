import { Router } from "express";
import type { Request, Response } from "express";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAndKey from "../middlewares/verifyTokenKey";
import verifyUserExist from "../middlewares/verifyUserExist";
import inputCheck from "../utils/inputCheck";
import serverHelper from "../utils/serverHelper";
import { classroomModel } from "../models/classroom";
import { ApiResponseMessage } from "../types/apiResponses";
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

export default routeAll;
export { route as classroom };
