import type { Types } from "mongoose";

type user = {
  access: boolean;
  userId: Types.ObjectId | string;
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
