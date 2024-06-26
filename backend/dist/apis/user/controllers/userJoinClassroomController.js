"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
const devDebug_1 = __importDefault(require("../../../utils/devDebug"));
const mongoose_1 = require("mongoose");
function userJoinClassroomController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    const { userId } = req.user;
    (0, serverHelper_1.default)(async () => {
        const isUserExist = await classroomModel_1.classroomModel.findOne({
            _id: new mongoose_1.Types.ObjectId(classroomId),
            $or: [{ "admins.userId": userId }, { "users.userId": userId }],
        });
        if (isUserExist) {
            res.status(400).json({
                success: false,
                message: "User already joined",
            });
            return;
        }
        // add user to a classroom
        const classroom = await classroomModel_1.classroomModel.updateOne({ _id: new mongoose_1.Types.ObjectId(classroomId) }, { users: [{ userId, access: false }] });
        if (classroom.modifiedCount === 0) {
            res
                .status(400)
                .json({ success: false, message: "user can't join in this classroom" });
            return;
        }
        (0, devDebug_1.default)("joined classroom");
        // send response
        res.status(201).json({
            success: true,
            message: "Joined in a classroom",
        });
    }, res);
}
exports.default = userJoinClassroomController;
