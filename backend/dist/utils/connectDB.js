"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const env_1 = __importDefault(require("./env"));
async function connectDB() {
    try {
        console.log("Connecting DB.....");
        mongoose_1.connection.on("connected", () => {
            console.log("Connected");
        });
        mongoose_1.connection.on("error", (err) => {
            console.error("Error to connecting DB", err);
        });
        const dbUrl = (0, env_1.default)("dbConnect");
        await (0, mongoose_1.connect)(dbUrl);
    }
    catch (err) {
        console.error("Failed to connect in DB.", err);
        process.exit(1);
    }
}
exports.default = connectDB;
