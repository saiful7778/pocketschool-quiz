import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
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
        max: 50, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again after 15 minutes",
        headers: true,
    });
    // add all universal middlewares
    app.use(express.json());
    if (getEnv("nodeEnv") === "development") {
        app.use(morgan("dev"));
    }
    app.use(limiter);
    app.use(helmet());
    // cors config
    app.use(cors({
        origin: accessSite,
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    }));
    // very first api route to get is server is running
    app.get("/", (_req, res) => {
        res.status(200).json({
            success: true,
            message: "server is running",
        });
    });
    app.get("/api", (_req, res) => {
        res.status(200).json({
            success: true,
            message: "api server is running",
        });
    });
    app.use("/api/users", userRoute);
    app.use("/api/classrooms", classroomRoute);
    app.use("/api/classrooms/quizzes", quizRoute);
    app.get("*", (_req, res) => {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    });
    app.use((err, _req, res) => {
        devDebug(err.message);
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    });
    return app;
}
