"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devDebug_1 = __importDefault(require("../../utils/devDebug"));
const classroomModel_1 = require("../../models/classroomModel");
const mongoose_1 = require("mongoose");
/**
 * This middleware take userId from request query parameters and classroomId from request parameters and check is user available and have access in this classroom
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns classroomUserRole by `req.classroomUserRole`
 */
async function verifyClassroomUserAvailable(req, res, next) {
    const { userId, classroomId } = req.query;
    if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("userId is unavailable");
        return;
    }
    if (!classroomId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("classroomId is unavailable");
        return;
    }
    try {
        const isUserAvailable = await classroomModel_1.classroomModel.aggregate([
            {
                $match: {
                    _id: new mongoose_1.Types.ObjectId(classroomId),
                    // check if userId exist in this classroom admin or user array also her access should be true
                    $or: [
                        {
                            "admins.userId": new mongoose_1.Types.ObjectId(userId),
                            "admins.access": true,
                        },
                        {
                            "users.userId": new mongoose_1.Types.ObjectId(userId),
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
                            if: { $in: [new mongoose_1.Types.ObjectId(userId), "$admins.userId"] },
                            then: "admin",
                            else: {
                                $cond: {
                                    if: { $in: [new mongoose_1.Types.ObjectId(userId), "$users.userId"] },
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
            (0, devDebug_1.default)("user not available or haven't access in this classroom");
            return;
        }
        req.classroomUserRole = isUserAvailable[0].role;
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("DB fetch error in verfiyClassroomUserAvailable middleware");
        return;
    }
}
exports.default = verifyClassroomUserAvailable;
