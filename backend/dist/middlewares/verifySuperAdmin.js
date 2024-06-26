"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devDebug_1 = __importDefault(require("../utils/devDebug"));
/**
 * This middleware take userId and role from verifyUserExist middleware then verify is role is superAdmin or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns userId by `req.userId`
 */
async function verifySuperAdmin(req, res, next) {
    const { role, userId } = req.user;
    if (role !== "superAdmin") {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        (0, devDebug_1.default)("User is not super admin");
        return;
    }
    req.userId = userId;
    next();
}
exports.default = verifySuperAdmin;