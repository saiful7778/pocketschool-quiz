import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
export const userModel = model("user", userSchema);
