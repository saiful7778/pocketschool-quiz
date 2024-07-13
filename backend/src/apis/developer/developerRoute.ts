import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken";
import verifyUser from "../../middlewares/verifyUser";
import devMessageCreateController from "./controllers/devMessageCreateController";

const developerRoute = Router();

developerRoute
  .route("/")
  .all(verifyToken)
  .post(
    verifyUser(["user", "admin", "superAdmin"]),
    devMessageCreateController
  );

export default developerRoute;
