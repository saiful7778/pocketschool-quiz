"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const devDebug_1 = __importDefault(require("../utils/devDebug"));
const env_1 = __importDefault(require("../utils/env"));
/**
 * This middleware take jwt token `Bearer {token}` Authorization request headers and verify it
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns jwt token by req.token
 */
function verifyToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("authorization headers is unavailable");
        return;
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        (0, devDebug_1.default)("authorization token is unavailable");
        return;
    }
    // verify the jwt token
    jsonwebtoken_1.default.verify(token, (0, env_1.default)("accessToken"), (err, decode) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            (0, devDebug_1.default)("token is not valid");
            return;
        }
        // send this jwt token
        req.token = decode;
        next();
    });
}
exports.default = verifyToken;
