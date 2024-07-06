import type { NextFunction, Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/user.model";

export default function userGetAllController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  serverHelper(async () => {
    // get all user account data without __v
    const users = await userModel.find({}, { __v: 0 });

    // send all user data
    res.status(200).send({ success: true, data: users });
  }, next);
}
