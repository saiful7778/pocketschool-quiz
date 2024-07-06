import { Schema, model } from "mongoose";
import type { Classroom, user } from "../types/classroom.type";

const classromUserSchema = new Schema<user>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    access: {
      type: Boolean,
      default: false,
      required: [true, "user access is required"],
    },
  },
  { _id: false, timestamps: true }
);

const classroomSchema = new Schema<Classroom>(
  {
    title: {
      type: String,
      required: [true, "Classroom title is required"],
    },
    users: {
      type: [classromUserSchema],
      required: [true, "user data is required"],
    },
  },
  { timestamps: true }
);

export const classroomModel = model<Classroom>("classroom", classroomSchema);
