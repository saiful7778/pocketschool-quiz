import type { Types } from "mongoose";

export type user = {
  userId: Types.ObjectId | string;
  access: boolean;
};

export interface Classroom {
  _id: Types.ObjectId | string;
  title: string;
  admins: user[];
  users?: user[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
