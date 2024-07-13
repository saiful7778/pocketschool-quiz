import { Schema, model } from "mongoose";
import type { DevMessage } from "../types/devMessage.type";

const devMessageSchema = new Schema<DevMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    title: {
      type: String,
      min: [1, "title minimum 1 cher."],
      max: [30, "title is too long"],
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      enum: ["issue", "bug", "improve", "feature"],
      required: [true, "Category is required"],
    },
    message: {
      type: String,
      min: [1, "Message minimum 1 cher."],
      max: [500, "Message is too long"],
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

export const devMessageModel = model<DevMessage>("message", devMessageSchema);
