import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";
import type { User } from "./userType";

declare module "express-serve-static-core" {
  interface Request {
    token: JwtPayload;
    userId: Types.ObjectId | string;
    user: {
      userId: Types.ObjectId | string;
      role: User["role"];
    };
    classroomUserRole: "user" | "admin" | null;
  }
}
