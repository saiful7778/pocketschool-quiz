"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devDebug_1 = __importDefault(require("../utils/devDebug"));
/**
 * This middleware take token email and request query key email and try compare it
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns
 */
function verifyTokenAndKey(req, res, next) {
    const token = req.token;
    const { email } = req.query;
    if (!email) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("query email is unavailable");
        return;
    }
    if (token?.email !== email) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("token user email and query email is not match");
        return;
    }
    next();
}
exports.default = verifyTokenAndKey;
