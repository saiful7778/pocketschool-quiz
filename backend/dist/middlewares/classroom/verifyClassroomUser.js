"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devDebug_1 = __importDefault(require("../../utils/devDebug"));
/**
 * This middleware take classroomUserRole from verifyClassroomUserAvailable middleware and check is user classroom role is admin or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns
 */
async function verifyClassroomAdmin(req, res, next) {
    const classroomUserRole = req.classroomUserRole;
    if (classroomUserRole !== "admin") {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        (0, devDebug_1.default)("user not admin in this classroom");
        return;
    }
    next();
}
exports.default = verifyClassroomAdmin;
