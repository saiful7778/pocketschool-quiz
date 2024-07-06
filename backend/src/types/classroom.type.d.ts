import type { Types } from "mongoose";

export type user = {
  user: Types.ObjectId | string;
  role: "admin" | "user";
  access: boolean;
};

export interface Classroom {
  _id: Types.ObjectId | string;
  title: string;
  users: user[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
