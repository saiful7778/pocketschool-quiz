import { Schema, model } from "mongoose";

const classroomSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Classroom title is required"],
    },
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Admin is required"],
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"],
      },
    ],
  },
  { timestamps: true }
);

export const classroomModel = model("classroom", classroomSchema);
