import { Router } from "express";
// middlewares
import verifyToken from "../../middlewares/verifyToken";
import verifyTokenAndKey from "../../middlewares/verifyTokenKey";
import verifyClassroomUserAvailable from "../../middlewares/classroom/verifyClassroomUserAvailable";
import verifyClassroomAdmin from "../../middlewares/classroom/verifyClassroomUser";
// controllers
import quizCreateController from "./controllers/admin/quizCreateController";
import quizGetAllController from "./controllers/admin/quizGetAllController";
import quizGetController from "./controllers/admin/quizGetController";
import quizUpdateController from "./controllers/admin/quizUpdateController";
import quizDeleteController from "./controllers/admin/quizDeleteController";
const quizRoute = Router();
// /api/classrooms/quizzes/admin
quizRoute
    .route("/admin")
    .all(verifyToken, verifyTokenAndKey, verifyClassroomUserAvailable, verifyClassroomAdmin)
    .post(quizCreateController)
    .get(quizGetAllController);
// /api/classrooms/quizzes/admin/:quizId
quizRoute
    .route("/admin/:quizId")
    .all(verifyToken, verifyTokenAndKey, verifyClassroomUserAvailable, verifyClassroomAdmin)
    .get(quizGetController)
    .patch(quizUpdateController)
    .delete(quizDeleteController);
export default quizRoute;
