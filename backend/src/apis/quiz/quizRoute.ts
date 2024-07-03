import { Router } from "express";
// middlewares
import verifyToken from "../../middlewares/verifyToken";
import verifyClassroomUser from "../../middlewares/verifyClassroomUser";
// controllers
import quizCreateController from "./controllers/admin/quizCreateController";
import quizGetAllController from "./controllers/admin/quizGetAllController";
import quizGetController from "./controllers/admin/quizGetController";
import quizUpdateController from "./controllers/admin/quizUpdateController";
import quizDeleteController from "./controllers/admin/quizDeleteController";
import quizAllController from "./controllers/quizAllController";
import quizController from "./controllers/quizController";
import quizResultController from "./controllers/quizResultController";

const quizRoute = Router();

// /api/quizzes/user
quizRoute.get(
  "/user",
  verifyToken,
  verifyClassroomUser(["user", "admin"]),
  quizAllController
);

// /api/quizzes/user/:quizId
quizRoute
  .route("/user/:quizId")
  .all(verifyToken)
  .get(quizController)
  .post(verifyClassroomUser(["user", "admin"]), quizResultController);

// /api/quizzes/admin
quizRoute
  .route("/admin")
  .all(verifyToken, verifyClassroomUser(["admin"]))
  .post(quizCreateController)
  .get(quizGetAllController);

// /api/quizzes/admin/:quizId
quizRoute
  .route("/admin/:quizId")
  .all(verifyToken, verifyClassroomUser(["admin"]))
  .get(quizGetController)
  .patch(quizUpdateController)
  .delete(quizDeleteController);

export default quizRoute;
