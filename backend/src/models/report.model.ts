import { Schema, model } from "mongoose";
import type { Report, ResponseType } from "../types/report.type";

const responseSchema = new Schema<ResponseType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      min: [1, "Message minimum 1 cher."],
      max: [500, "Message is too long"],
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, _id: false }
);

const reportSchema = new Schema<Report>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    title: {
      type: String,
      min: [1, "title minimum 1 cher."],
      max: [50, "title is too long"],
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
    response: responseSchema,
  },
  { timestamps: true }
);

export const reportModel = model<Report>("report", reportSchema);
