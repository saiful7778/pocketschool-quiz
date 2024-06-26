"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devDebug_1 = __importDefault(require("../utils/devDebug"));
const userModel_1 = require("../models/userModel");
/**
 * This middleware take userId from request query key and verify is user exist or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns user Id and role by `req.user` `{userId: existUser._id, role: existUser.role}`
 */
async function verifyUserExist(req, res, next) {
    const { userId } = req.query;
    if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("userId is unavailable");
        return;
    }
    try {
        const existUser = await userModel_1.userModel.findOne({ _id: userId }, { _id: 1, role: 1 });
        if (!existUser) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            (0, devDebug_1.default)("User doesn't exist");
            return;
        }
        req.user = { userId: existUser._id, role: existUser.role };
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("User query catch error in verifyUserID middleware");
        return;
    }
}
exports.default = verifyUserExist;
