"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputCheck_1 = __importDefault(require("../../../utils/inputCheck"));
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const classroomModel_1 = require("../../../models/classroomModel");
const devDebug_1 = __importDefault(require("../../../utils/devDebug"));
function classroomCreateController(req, res) {
    // get data
    const admin = req.userId;
    const { title } = req.body;
    // check is all data available or not
    const check = (0, inputCheck_1.default)([title], res);
    if (!check)
        return;
    (0, serverHelper_1.default)(async () => {
        // create a new classroom using classroom mongoose model
        await classroomModel_1.classroomModel.create({
            title,
            admins: [{ userId: admin, access: true }],
        });
        (0, devDebug_1.default)("new classroom created");
        // send response data
        res.status(201).send({
            success: true,
            message: "classroom is created",
        });
    }, res);
}
exports.default = classroomCreateController;
