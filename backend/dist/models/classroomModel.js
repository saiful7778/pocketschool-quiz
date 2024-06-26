"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classroomModel = void 0;
const mongoose_1 = require("mongoose");
const classromUserSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user id is required"],
    },
    access: {
        type: Boolean,
        default: false,
        required: [true, "user access is required"],
    },
});
const classroomSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Classroom title is required"],
    },
    admins: {
        type: [classromUserSchema],
        required: [true, "admin is required"],
    },
    users: {
        type: [classromUserSchema],
        default: [],
    },
}, { timestamps: true });
exports.classroomModel = (0, mongoose_1.model)("classroom", classroomSchema);
