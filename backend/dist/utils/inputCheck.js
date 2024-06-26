"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devDebug_1 = __importDefault(require("./devDebug"));
/**
 * This is function check is all inputs element are available
 * @param inputs
 * @param res Express response
 * @returns `true` or `false`
 */
function inputCheck(inputs, res) {
    const inputDataType = [];
    for (let i = 0; i < inputs.length; i++) {
        if (typeof inputs[i] === "undefined") {
            inputDataType.push(undefined);
        }
    }
    if (inputDataType.includes(undefined)) {
        (0, devDebug_1.default)("invalid input data");
        res.status(400).json({
            success: false,
            message: "Invalid input data",
        });
        return false;
    }
    return true;
}
exports.default = inputCheck;
