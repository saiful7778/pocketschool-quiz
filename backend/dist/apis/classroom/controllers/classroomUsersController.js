"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
function classroomUsersController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    const userId = req.query.userId;
    (0, serverHelper_1.default)(async () => {
        // find classroom data from classroom mongoose model and schema
        const classroom = await classroomModel_1.classroomModel
            .findOne({
            _id: classroomId,
            "admins.userId": userId,
            "admins.access": true,
        })
            .populate({
            path: "admins.userId",
            select: ["fullName", "email", "image"],
        })
            .populate({
            path: "users.userId",
            select: ["fullName", "email", "image"],
        });
        // send response
        res.status(200).json({
            success: true,
            data: classroom,
        });
    }, res);
}
exports.default = classroomUsersController;
