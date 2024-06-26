import { Schema, model } from "mongoose";
const classromUserSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user id is required"],
    },
    access: {
        type: Boolean,
        default: false,
        required: [true, "user access is required"],
    },
});
const classroomSchema = new Schema({
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
export const classroomModel = model("classroom", classroomSchema);
