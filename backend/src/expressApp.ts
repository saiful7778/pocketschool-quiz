import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
// types
import type { HttpError } from "http-errors";
import type { NextFunction, Request, Response } from "express";
// utils
import getEnv from "./utils/env";
import devDebug from "./utils/devDebug";
// api routes
import userRoute from "./apis/user/userRoute";
import classroomRoute from "./apis/classroom/classroomRoute";
import quizRoute from "./apis/quiz/quizRoute";

export default function expressApp() {
  const app = express();

  // get some essential data from .env file via getEnv()
  const frontendUrl = getEnv("frontendUrl");
  const accessSite = [frontendUrl, "http://localhost:5173"];

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again after 15 minutes",
    headers: true,
  });

  // add all universal middlewares
  app.use(helmet());
  app.use(express.json());
  if (getEnv("nodeEnv") === "development") {
    app.use(morgan("dev"));
  }
  app.use(limiter);
  // cors config
  app.use(
    cors({
      origin: accessSite,
      methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    })
  );

  // very first api route to get is server is running
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "server is running",
    });
  });

  app.get("/api", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "api server is running",
    });
  });

  app.use("/api/users", userRoute);
  app.use("/api/classrooms", classroomRoute);
  app.use("/api/classrooms/quizzes", quizRoute);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  });

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: HttpError, _req: Request, res: Response, next: NextFunction) => {
      const errData = {
        status: err.status || err.statusCode || 500,
        name: err.name,
        message: err.message || "server error",
      };

      devDebug(errData.message);

      res.status(errData.status).json({
        success: false,
        message: errData.name,
      });
    }
  );

  return app;
}
