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

const quizRoute = Router();

// /api/classrooms/quizzes/user
quizRoute.get("/user", verifyToken, quizAllController);

// /api/classrooms/quizzes/user/:quizId
quizRoute.get("/user/:quizId", verifyToken, quizController);

// /api/classrooms/quizzes/admin
quizRoute
  .route("/admin")
  .all(verifyToken, verifyClassroomUser("admin"))
  .post(quizCreateController)
  .get(quizGetAllController);

// /api/classrooms/quizzes/admin/:quizId
quizRoute
  .route("/admin/:quizId")
  .all(verifyToken, verifyClassroomUser("admin"))
  .get(quizGetController)
  .patch(quizUpdateController)
  .delete(quizDeleteController);

export default quizRoute;
