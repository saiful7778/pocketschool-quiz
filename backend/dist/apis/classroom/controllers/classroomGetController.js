"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
const mongoose_1 = require("mongoose");
function classroomGetController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    const userId = req.query.userId;
    (0, serverHelper_1.default)(async () => {
        // get classroom data by mongodb aggregation pipeline
        const classroom = await classroomModel_1.classroomModel.aggregate([
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
                    admins: 0,
                    users: 0,
                    __v: 0,
                },
            },
        ]);
        if (!classroom || classroom.length === 0) {
            res.status(404).json({
                success: false,
                message: "Classroom not found",
            });
            return;
        }
        // send response
        res.status(200).json({
            success: true,
            data: classroom[0],
        });
    }, res);
}
exports.default = classroomGetController;
