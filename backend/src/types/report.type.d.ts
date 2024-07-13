import { Types } from "mongoose";

export interface ResponseType {
  user: Types.ObjectId | string;
  message: string;
  close: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  _id: Types.ObjectId | string;
  user: Types.ObjectId | string;
  title: string;
  category: "issue" | "bug" | "improve" | "feature";
  message: string;
  response?: ResponseType;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
