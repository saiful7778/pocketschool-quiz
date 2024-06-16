import { Schema, model } from "mongoose";

const classroomSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Classroom title is required"],
    },
    admins: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: [true, "Admin id is required"],
        },
        access: {
          type: Boolean,
          required: [true, "Admin access is required"],
        },
      },
    ],
    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: [true, "User id is required"],
        },
        access: {
          type: Boolean,
          default: false,
          required: [true, "User access is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

export const classroomModel = model("classroom", classroomSchema);
