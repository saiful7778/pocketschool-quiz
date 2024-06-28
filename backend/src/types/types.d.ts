import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    token: JwtPayload;
    userId: Types.ObjectId | string;
  }
}
