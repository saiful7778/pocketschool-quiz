"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
/**
 * This is function output `console.log();` only development mode
 * @param inputText string
 */
function devDebug(inputText) {
    const nodeEnv = (0, env_1.default)("nodeEnv");
    if (nodeEnv !== "production") {
        console.log("debug:", inputText);
    }
}
exports.default = devDebug;
