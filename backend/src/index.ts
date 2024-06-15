import express from "express";
import type { Request, Response, Application } from "express";
import cors from "cors";
import getEnv from "./utils/env";
import users, { user } from "./routes/user";
import { connect, connection } from "mongoose";
import { authentication } from "./routes/authectication";
import classrooms, { classroom } from "./routes/classroom";

(async () => {
  try {
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
  const app: Application = express();

  const port = getEnv("port");
  const frontendUrl = getEnv("frontendUrl");
  const accessSite = [frontendUrl, "http://localhost:5173"];

  app.use(
    cors({
      origin: accessSite,
      methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    })
  );
  app.use(express.json());

  app.get("/", (_req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      message: "server is running",
    });
  });

  app.use("/user", user);
  app.use("/users", users);
  app.use("/classroom", classroom);
  app.use("/classrooms", classrooms);
  app.use("/authentication", authentication);

  app.get("*", (_req: Request, res: Response) => {
    res.status(404).send({
      success: false,
      message: "not found",
    });
  });

  app.listen(port, () => {
    console.log(`server is running on port:${port}`);
  });
}

mainServer();
