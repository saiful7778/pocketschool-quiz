"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devDebug_1 = __importDefault(require("./devDebug"));
/**
 * This function resolve all promises in this server app
 * @param inputFunction
 * @param res
 */
async function serverHelper(inputFunction, res) {
    try {
        await inputFunction();
    }
    catch (err) {
        if (err instanceof Error) {
            (0, devDebug_1.default)(err.message);
            res.status(500).json({
                success: false,
                message: "server error",
            });
        }
    }
}
exports.default = serverHelper;
