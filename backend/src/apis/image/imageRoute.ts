import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken";
import generateImageController from "./controllers/generateImageController";

const imageRoute = Router();

imageRoute.post("/", verifyToken, generateImageController);

export default imageRoute;
