import { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";
import type { User } from "./user";

declare module "express-serve-static-core" {
  interface Request {
    token: JwtPayload;
    userId: Types.ObjectId | string;
    user: {
      userId: Types.ObjectId | string;
      role: User["role"];
    };
  }
}
