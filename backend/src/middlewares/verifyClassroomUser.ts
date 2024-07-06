import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { classroomModel } from "../models/classroom.model";
import { Types } from "mongoose";

/**
 * This middleware take classroomUserRole from verifyClassroomUserAvailable middleware and check is user classroom role is admin or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns
 */
export default function verifyClassroomUser(userRole: ("user" | "admin")[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { userId, classroomId } = req.query as {
      userId: string;
      classroomId: string;
    };

    if (!userId) {
      return next(createHttpError(401, "userId is unavailable"));
    }
    if (!classroomId) {
      return next(createHttpError(401, "classroomId is unavailable"));
    }

    try {
      const isUserAvailable = await classroomModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(classroomId),
            "users.user": new Types.ObjectId(userId),
            "users.access": true,
          },
        },
        {
          $addFields: {
            role: {
              $cond: {
                if: { $in: ["admin", "$users.role"] },
                then: "admin",
                else: {
                  $cond: {
                    if: { $in: ["user", "$users.role"] },
                    then: "user",
                    else: null,
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            role: 1,
          },
        },
      ]);

      if (!isUserAvailable || isUserAvailable.length === 0) {
        return next(
          createHttpError(
            401,
            "user not available or haven't access in this classroom"
          )
        );
      }

      if (!userRole.includes(isUserAvailable[0].role)) {
        return next(
          createHttpError(403, "user haven't access of this classroom")
        );
      }

      next();
    } catch {
      return next(
        createHttpError(401, "classroom user find error in verfiyClassroomUser")
      );
    }
  };
}
