"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputCheck_1 = __importDefault(require("../../../utils/inputCheck"));
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
const mongoose_1 = require("mongoose");
function classroomUserUpdateController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    const classroomUserId = req.params.classroomUserId;
    const userId = req.query.userId;
    const { access, role } = req.body;
    // validate
    const check = (0, inputCheck_1.default)([access], res);
    if (!check)
        return;
    // validate
    if (userId === classroomUserId) {
        res.status(400).json({
            success: false,
            message: "You can't update your role or access",
        });
        return;
    }
    (0, serverHelper_1.default)(async () => {
        // update classroom user data using classroom mongoose model and schema
        const classroom = await classroomModel_1.classroomModel.updateOne({
            _id: new mongoose_1.Types.ObjectId(classroomId),
            "admins.userId": userId,
            "admins.access": true,
        }, {
            $set: {
                "users.$[user].access": access,
                "admins.$[admin].access": access,
            },
        }, {
            arrayFilters: [
                { "user.userId": classroomUserId },
                { "admin.userId": classroomUserId },
            ],
        });
        if (!classroom) {
            res.status(404).json({
                success: false,
                message: "Classroom not found",
            });
            return;
        }
        if (typeof role !== "undefined") {
            if (role === "user") {
                await classroomModel_1.classroomModel.updateOne({
                    _id: new mongoose_1.Types.ObjectId(classroomId),
                    "admins.userId": userId,
                    "admins.access": true,
                }, {
                    $pull: {
                        admins: { userId: classroomUserId },
                    },
                    $push: {
                        users: { userId: classroomUserId, access },
                    },
                });
            }
            else if (role === "admin") {
                await classroomModel_1.classroomModel.updateOne({
                    _id: classroomId,
                    // check if requested user admin and her access true in this classroom
                    "admins.userId": userId,
                    "admins.access": true,
                }, {
                    $pull: {
                        users: { userId: classroomUserId },
                    },
                    $push: {
                        admins: { userId: classroomUserId, access },
                    },
                });
            }
        }
        // send response
        res.status(200).json({
            success: true,
            data: classroom,
        });
    }, res);
}
exports.default = classroomUserUpdateController;
