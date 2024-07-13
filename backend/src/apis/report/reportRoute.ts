import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken";
import verifyUser from "../../middlewares/verifyUser";
import reportCreateController from "./controllers/reportCreateController";
import reportGetAllController from "./controllers/reportGetAllController";
import reportResponseCreateController from "./controllers/reportResponseCreateController";

const reportRoute = Router();

// /api/report/
reportRoute
  .route("/")
  .all(verifyToken)
  .get(reportGetAllController)
  .post(verifyUser(["user", "admin", "superAdmin"]), reportCreateController);

// /api/report/admin/:reportId
reportRoute
  .route("/admin/:reportId")
  .all(verifyToken)
  .post(verifyUser(["superAdmin"]), reportResponseCreateController);

export default reportRoute;
