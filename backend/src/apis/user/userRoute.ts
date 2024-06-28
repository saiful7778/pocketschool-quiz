import { Router } from "express";
// middlewares
import verifyToken from "../../middlewares/verifyToken";
import verifyUser from "../../middlewares/verifyUser";
// controllers
import userCreateController from "./controllers/userCreateController";
import userGetAllController from "./controllers/userGetAllController";
import userLoginController from "./controllers/userLoginController";
import userGetController from "./controllers/userGetController";
import userUpdateController from "./controllers/userUpdateController";
import userJoinedClassroomsController from "./controllers/userJoinedClassroomsController";
import userJoinClassroomController from "./controllers/userJoinClassroomController";

const userRoute = Router();

// /api/users/login
userRoute.post("/login", userLoginController);

// /api/users/classrooms
userRoute.get("/classrooms", verifyToken, userJoinedClassroomsController);

// /api/users/join_classroom/:classroomId
userRoute.post(
  "/join_classroom/:classroomId",
  verifyToken,
  userJoinClassroomController
);

// /api/users/
userRoute
  .route("/")
  .post(userCreateController)
  .get(verifyToken, verifyUser(["superAdmin"]), userGetAllController);

// /api/users/:userId
userRoute
  .route("/:userId")
  .all(verifyToken)
  .get(userGetController)
  .patch(verifyUser(["superAdmin"]), userUpdateController);

export default userRoute;
