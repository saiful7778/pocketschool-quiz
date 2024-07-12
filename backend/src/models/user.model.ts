import { Schema, model } from "mongoose";
import type { User } from "../types/user.type";

const userSchema = new Schema<User>(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    image: {
      type: String,
      default: null,
    },
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
  },
  { timestamps: true }
);

export const userModel = model<User>("user", userSchema);
