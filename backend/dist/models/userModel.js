"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: [true, "Full name is required"] },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    image: String,
    uid: { type: String, required: [true, "User uid is required"] },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user",
    },
    access: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.userModel = (0, mongoose_1.model)("user", userSchema);
