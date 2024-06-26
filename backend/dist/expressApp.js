"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = __importDefault(require("helmet"));
// utils
const env_1 = __importDefault(require("./utils/env"));
const devDebug_1 = __importDefault(require("./utils/devDebug"));
// api routes
const userRoute_1 = __importDefault(require("./apis/user/userRoute"));
const classroomRoute_1 = __importDefault(require("./apis/classroom/classroomRoute"));
const quizRoute_1 = __importDefault(require("./apis/quiz/quizRoute"));
function expressApp() {
    const app = (0, express_1.default)();
    // get some essential data from .env file via getEnv()
    const frontendUrl = (0, env_1.default)("frontendUrl");
    const accessSite = [frontendUrl, "http://localhost:5173"];
    const limiter = (0, express_rate_limit_1.rateLimit)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 50, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again after 15 minutes",
        headers: true,
    });
    // add all universal middlewares
    app.use(express_1.default.json());
    if ((0, env_1.default)("nodeEnv") === "development") {
        app.use((0, morgan_1.default)("dev"));
    }
    app.use(limiter);
    app.use((0, helmet_1.default)());
    // cors config
    app.use((0, cors_1.default)({
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
    app.use("/api/users", userRoute_1.default);
    app.use("/api/classrooms", classroomRoute_1.default);
    app.use("/api/classrooms/quizzes", quizRoute_1.default);
    app.get("*", (_req, res) => {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    });
    app.use((err, _req, res) => {
        (0, devDebug_1.default)(err.message);
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    });
    return app;
}
exports.default = expressApp;
