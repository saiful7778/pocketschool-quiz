"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
function userJoinedClassroomsController(req, res) {
    const { userId } = req.user;
    (0, serverHelper_1.default)(async () => {
        const classrooms = await classroomModel_1.classroomModel.find({
            $or: [
                { "admins.userId": userId, "admins.access": true },
                { "users.userId": userId, "users.access": true },
            ],
        }, { title: 1 });
        res.status(200).json({ success: true, data: classrooms });
    }, res);
}
exports.default = userJoinedClassroomsController;
