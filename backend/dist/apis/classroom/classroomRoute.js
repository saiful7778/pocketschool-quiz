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
const verifyAdminAndSuperAdmin_1 = __importDefault(require("../../middlewares/verifyAdminAndSuperAdmin"));
// controllers
const classroomCreateController_1 = __importDefault(require("./controllers/classroomCreateController"));
const classroomGetController_1 = __importDefault(require("./controllers/classroomGetController"));
const classroomUpdateController_1 = __importDefault(require("./controllers/classroomUpdateController"));
const classroomUsersController_1 = __importDefault(require("./controllers/classroomUsersController"));
const classroomUserUpdateController_1 = __importDefault(require("./controllers/classroomUserUpdateController"));
const classroomUserController_1 = __importDefault(require("./controllers/classroomUserController"));
const classroomRoute = (0, express_1.Router)();
// /api/classrooms
classroomRoute.post("/", verifyToken_1.default, verifyTokenKey_1.default, verifyUserExist_1.default, verifyAdminAndSuperAdmin_1.default, classroomCreateController_1.default);
// /api/classrooms/:classroomId
classroomRoute
    .route("/:classroomId")
    .all(verifyToken_1.default, verifyTokenKey_1.default)
    .get(classroomGetController_1.default)
    .patch(classroomUpdateController_1.default);
// /api/classrooms/:classroomId/users
classroomRoute.get("/:classroomId/users", verifyToken_1.default, verifyTokenKey_1.default, classroomUsersController_1.default);
// /api/classrooms/:classroomId/users/:classroomUserId
classroomRoute
    .route("/:classroomId/users/:classroomUserId")
    .all(verifyToken_1.default, verifyTokenKey_1.default)
    .get(classroomUserController_1.default)
    .patch(classroomUserUpdateController_1.default);
exports.default = classroomRoute;
