"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
// TODO: update this
function classroomUserController(req, res) {
    const classroomId = req.params.classroomId;
    const classroomUserId = req.params.classroomUserId;
    (0, serverHelper_1.default)(async () => {
        const classroomUser = await classroomModel_1.classroomModel.findOne({
            _id: classroomId,
            $or: [
                { "admins.userId": classroomUserId },
                { "users.userId": classroomUserId },
            ],
        }, { admins: 1, users: 1 });
        // send response
        res.status(200).json({
            success: true,
            data: classroomUser,
        });
    }, res);
}
exports.default = classroomUserController;
