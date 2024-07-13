import { Types } from "mongoose";

export interface DevMessage {
  _id: Types.ObjectId | string;
  user: Types.ObjectId | string;
  title: string;
  category: "issue" | "bug" | "improve" | "feature";
  message: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
