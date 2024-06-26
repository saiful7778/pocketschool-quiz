"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputCheck_1 = __importDefault(require("../../../utils/inputCheck"));
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
const mongoose_1 = require("mongoose");
function classroomUpdateController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    const userId = req.query.userId;
    const { title } = req.body;
    const check = (0, inputCheck_1.default)([title], res);
    if (!check)
        return;
    (0, serverHelper_1.default)(async () => {
        const classroom = await classroomModel_1.classroomModel.updateOne({
            _id: new mongoose_1.Types.ObjectId(classroomId),
            "admins.userId": userId,
            "admins.access": true,
        }, { title });
        res.status(200).json({
            success: true,
            data: classroom,
        });
    }, res);
}
exports.default = classroomUpdateController;
