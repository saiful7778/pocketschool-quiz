"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// middlewares
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const verifyTokenKey_1 = __importDefault(require("../../middlewares/verifyTokenKey"));
const verifyUserExist_1 = __importDefault(require("../../middlewares/verifyUserExist"));
const verifySuperAdmin_1 = __importDefault(require("../../middlewares/verifySuperAdmin"));
// controllers
const userCreateController_1 = __importDefault(require("./controllers/userCreateController"));
const userGetAllController_1 = __importDefault(require("./controllers/userGetAllController"));
const userLoginController_1 = __importDefault(require("./controllers/userLoginController"));
const userGetController_1 = __importDefault(require("./controllers/userGetController"));
const userUpdateController_1 = __importDefault(require("./controllers/userUpdateController"));
const userJoinedClassroomsController_1 = __importDefault(require("./controllers/userJoinedClassroomsController"));
const userJoinClassroomController_1 = __importDefault(require("./controllers/userJoinClassroomController"));
const userRoute = (0, express_1.Router)();
// /api/users/login
userRoute.post("/login", userLoginController_1.default);
// /api/users/classrooms
userRoute.get("/classrooms", verifyToken_1.default, verifyTokenKey_1.default, verifyUserExist_1.default, userJoinedClassroomsController_1.default);
// /api/users/join_classroom/:classroomId
userRoute.post("/join_classroom/:classroomId", verifyToken_1.default, verifyTokenKey_1.default, verifyUserExist_1.default, userJoinClassroomController_1.default);
// /api/users/
userRoute
    .route("/")
    .post(userCreateController_1.default)
    .get(verifyToken_1.default, verifyTokenKey_1.default, verifyUserExist_1.default, verifySuperAdmin_1.default, userGetAllController_1.default);
// /api/users/:userId
userRoute
    .route("/:userId")
    .all(verifyToken_1.default, verifyTokenKey_1.default)
    .get(userGetController_1.default)
    .patch(verifyUserExist_1.default, verifySuperAdmin_1.default, userUpdateController_1.default);
exports.default = userRoute;
