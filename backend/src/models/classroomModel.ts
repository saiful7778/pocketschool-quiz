import { Schema, model } from "mongoose";
import type { Classroom, user } from "../types/classroomType";

const classromUserSchema = new Schema<user>({
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

const classroomSchema = new Schema<Classroom>(
  {
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
  },
  { timestamps: true }
);

export const classroomModel = model<Classroom>("classroom", classroomSchema);
