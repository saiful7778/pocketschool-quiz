import { User } from "./user";

export interface ClassroomMainPage {
  _id: string;
  title: string;
  admin: boolean;
  user: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface user {
  _id: string;
  access: boolean;
  userId: {
    _id: User["_id"];
    fullName: User["fullName"];
    image?: string | null;
    email: User["email"];
  };
}

export interface Classroom {
  _id: string;
  title: string;
  admins?: user[];
  users?: user[];
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
