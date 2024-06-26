import type { Request, Response } from "express";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/userModel";
import devDebug from "../../../utils/devDebug";

export default function userGetController(req: Request, res: Response) {
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
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      devDebug("User not found");
      return;
    }

    // send response
    res.status(200).json({
      success: true,
      data: user,
    });
  }, res);
}
