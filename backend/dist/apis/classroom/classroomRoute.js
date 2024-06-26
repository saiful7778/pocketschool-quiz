import { Router } from "express";
// middlewares
import verifyToken from "../../middlewares/verifyToken";
import verifyTokenAndKey from "../../middlewares/verifyTokenKey";
import verifyUserExist from "../../middlewares/verifyUserExist";
import verifyAdminAndSuperAdmin from "../../middlewares/verifyAdminAndSuperAdmin";
// controllers
import classroomCreateController from "./controllers/classroomCreateController";
import classroomGetController from "./controllers/classroomGetController";
import classroomUpdateController from "./controllers/classroomUpdateController";
import classroomUsersController from "./controllers/classroomUsersController";
import classroomUserUpdateController from "./controllers/classroomUserUpdateController";
import classroomUserController from "./controllers/classroomUserController";
const classroomRoute = Router();
// /api/classrooms
classroomRoute.post("/", verifyToken, verifyTokenAndKey, verifyUserExist, verifyAdminAndSuperAdmin, classroomCreateController);
// /api/classrooms/:classroomId
classroomRoute
    .route("/:classroomId")
    .all(verifyToken, verifyTokenAndKey)
    .get(classroomGetController)
    .patch(classroomUpdateController);
// /api/classrooms/:classroomId/users
classroomRoute.get("/:classroomId/users", verifyToken, verifyTokenAndKey, classroomUsersController);
// /api/classrooms/:classroomId/users/:classroomUserId
classroomRoute
    .route("/:classroomId/users/:classroomUserId")
    .all(verifyToken, verifyTokenAndKey)
    .get(classroomUserController)
    .patch(classroomUserUpdateController);
export default classroomRoute;
