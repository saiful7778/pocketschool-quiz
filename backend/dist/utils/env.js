"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const envFound = (0, dotenv_1.config)();
if (envFound.error) {
    throw new Error("no .env file found");
}
// all `.env` keys
const envVars = {
    port: process.env.PORT || 5000,
    frontendUrl: process.env.FRONTEND_URL,
    nodeEnv: process.env.NODE_ENV,
    dbConnect: process.env.DB_CONNECT,
    accessToken: process.env.ACCESS_TOKEN,
};
/**
 * This function return `.env` key and throw error when key unavailable
 * @param varName
 * @returns `.env` key value as string
 */
function getEnv(varName) {
    if (typeof envVars[varName] === "undefined") {
        console.error(`'${varName}' is not available`);
        process.exit(1);
    }
    else {
        return envVars[varName];
    }
}
exports.default = getEnv;
