import devDebug from "../../utils/devDebug";
import { classroomModel } from "../../models/classroomModel";
import { Types } from "mongoose";
/**
 * This middleware take userId from request query parameters and classroomId from request parameters and check is user available and have access in this classroom
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns classroomUserRole by `req.classroomUserRole`
 */
export default async function verifyClassroomUserAvailable(req, res, next) {
    const { userId, classroomId } = req.query;
    if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        devDebug("userId is unavailable");
        return;
    }
    if (!classroomId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        devDebug("classroomId is unavailable");
        return;
    }
    try {
        const isUserAvailable = await classroomModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(classroomId),
                    // check if userId exist in this classroom admin or user array also her access should be true
                    $or: [
                        {
                            "admins.userId": new Types.ObjectId(userId),
                            "admins.access": true,
                        },
                        {
                            "users.userId": new Types.ObjectId(userId),
                            "users.access": true,
                        },
                    ],
                },
            },
            {
                // add a new role field of user in admin or user
                $addFields: {
                    role: {
                        $cond: {
                            if: { $in: [new Types.ObjectId(userId), "$admins.userId"] },
                            then: "admin",
                            else: {
                                $cond: {
                                    if: { $in: [new Types.ObjectId(userId), "$users.userId"] },
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
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            devDebug("user not available or haven't access in this classroom");
            return;
        }
        req.classroomUserRole = isUserAvailable[0].role;
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Unauthorized" });
        devDebug("DB fetch error in verfiyClassroomUserAvailable middleware");
        return;
    }
}
