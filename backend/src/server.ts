import express from "express";
import type { Request, Response, Application } from "express";
import cors from "cors";
import getEnv from "./utils/env";
import users, { user } from "./routes/userRoute";
import { connect } from "mongoose";
import { authentication } from "./routes/authecticationRoute";
import classrooms, { classroom } from "./routes/classroomRoute";
import { quiz } from "./routes/quizRoute";

// connect to mongodb database using mongoose
(async () => {
  try {
    // get database uri from .env file via getEnv()
    const dbUrl = getEnv("dbConnect");
    console.log("connecting...");
    await connect(dbUrl);
    console.log("connected DB");
  } catch (err) {
    if (err instanceof Error) {
      console.log("connection failed");
      console.log(err.message);
    }
  }
})();

function mainServer() {
  // main server app instance
  const app: Application = express();

  // get some essential data from .env file via getEnv()
  const port = getEnv("port");
  const frontendUrl = getEnv("frontendUrl");
  const accessSite = [frontendUrl, "http://localhost:5173"];

  // add all universal middlewares
  app.use(express.json());
  // cors config
  app.use(
    cors({
      origin: accessSite,
      methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    })
  );

  // add very first api route to get is server is running
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      message: "server is running",
    });
  });

  // add all routes with there base route
  app.use("/user", user);
  app.use("/users", users);
  app.use("/classroom", classroom);
  app.use("/classrooms", classrooms);
  app.use("/classroom/quiz", quiz);
  app.use("/authentication", authentication);

  // add not found route
  app.get("*", (_req: Request, res: Response) => {
    res.status(404).send({
      success: false,
      message: "not found",
    });
  });

  // add main server app listener with port variable
  app.listen(port, () => {
    console.log(`server is running on port:${port}`);
  });
}

// invoke the root app function
mainServer();
