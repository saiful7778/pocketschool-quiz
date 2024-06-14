import express from "express";
import type { Request, Response, Application } from "express";
import cors from "cors";
import getEnv from "./utils/env";

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
