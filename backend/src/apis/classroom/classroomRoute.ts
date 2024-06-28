import { Router } from "express";
// middlewares
import verifyToken from "../../middlewares/verifyToken";
import verifyUser from "../../middlewares/verifyUser";
// controllers
import classroomCreateController from "./controllers/classroomCreateController";
import classroomGetController from "./controllers/classroomGetController";
import classroomUpdateController from "./controllers/classroomUpdateController";
import classroomUsersController from "./controllers/classroomUsersController";
import classroomUserUpdateController from "./controllers/classroomUserUpdateController";
import classroomUserController from "./controllers/classroomUserController";

const classroomRoute = Router();

// /api/classrooms
classroomRoute.post(
  "/",
  verifyToken,
  verifyUser(["admin", "superAdmin"]),
  classroomCreateController
);

// /api/classrooms/:classroomId
classroomRoute
  .route("/:classroomId")
  .all(verifyToken)
  .get(classroomGetController)
  .patch(classroomUpdateController);

// /api/classrooms/:classroomId/users
classroomRoute.get(
  "/:classroomId/users",
  verifyToken,
  classroomUsersController
);

// /api/classrooms/:classroomId/users/:classroomUserId
classroomRoute
  .route("/:classroomId/users/:classroomUserId")
  .all(verifyToken)
  .get(classroomUserController)
  .patch(classroomUserUpdateController);

export default classroomRoute;
