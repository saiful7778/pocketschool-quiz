import type { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId | string;
  fullName: string;
  email: string;
  image?: string | null;
  uid: string;
  role: "user" | "admin" | "superAdmin";
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
