import { Router } from "express";
// middlewares
import verifyToken from "../../middlewares/verifyToken";
import verifyTokenAndKey from "../../middlewares/verifyTokenKey";
import verifyUserExist from "../../middlewares/verifyUserExist";
import verifySuperAdmin from "../../middlewares/verifySuperAdmin";
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
userRoute.get("/classrooms", verifyToken, verifyTokenAndKey, verifyUserExist, userJoinedClassroomsController);
// /api/users/join_classroom/:classroomId
userRoute.post("/join_classroom/:classroomId", verifyToken, verifyTokenAndKey, verifyUserExist, userJoinClassroomController);
// /api/users/
userRoute
    .route("/")
    .post(userCreateController)
    .get(verifyToken, verifyTokenAndKey, verifyUserExist, verifySuperAdmin, userGetAllController);
// /api/users/:userId
userRoute
    .route("/:userId")
    .all(verifyToken, verifyTokenAndKey)
    .get(userGetController)
    .patch(verifyUserExist, verifySuperAdmin, userUpdateController);
export default userRoute;
