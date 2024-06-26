"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputCheck_1 = __importDefault(require("../../../utils/inputCheck"));
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const userModel_1 = require("../../../models/userModel");
const classroomModel_1 = require("../../../models/classroomModel");
const devDebug_1 = __importDefault(require("../../../utils/devDebug"));
function userCreateController(req, res) {
    // get the data
    const { fullName, email, uid, classroomId, role, access } = req.body;
    // validate the data
    const check = (0, inputCheck_1.default)([fullName, email, uid, role, access], res);
    if (!check)
        return;
    (0, serverHelper_1.default)(async () => {
        // create new user
        const user = await userModel_1.userModel.create({
            fullName,
            email,
            uid,
            role,
            access,
        });
        // join user to a classroom if classroomId is available
        if (typeof classroomId !== "undefined") {
            await classroomModel_1.classroomModel.updateOne({
                _id: classroomId,
            }, { users: [{ userId: user.id, access: true }] }, { upsert: true });
            (0, devDebug_1.default)("new user is connected by classroom");
        }
        (0, devDebug_1.default)("new user is created");
        // send response
        res.status(201).json({
            success: true,
            message: "user is created",
        });
    }, res);
}
exports.default = userCreateController;
