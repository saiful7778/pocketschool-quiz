"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// middlewares
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const verifyTokenKey_1 = __importDefault(require("../../middlewares/verifyTokenKey"));
const verifyClassroomUserAvailable_1 = __importDefault(require("../../middlewares/classroom/verifyClassroomUserAvailable"));
const verifyClassroomUser_1 = __importDefault(require("../../middlewares/classroom/verifyClassroomUser"));
// controllers
const quizCreateController_1 = __importDefault(require("./controllers/admin/quizCreateController"));
const quizGetAllController_1 = __importDefault(require("./controllers/admin/quizGetAllController"));
const quizGetController_1 = __importDefault(require("./controllers/admin/quizGetController"));
const quizUpdateController_1 = __importDefault(require("./controllers/admin/quizUpdateController"));
const quizDeleteController_1 = __importDefault(require("./controllers/admin/quizDeleteController"));
const quizRoute = (0, express_1.Router)();
// /api/classrooms/quizzes/admin
quizRoute
    .route("/admin")
    .all(verifyToken_1.default, verifyTokenKey_1.default, verifyClassroomUserAvailable_1.default, verifyClassroomUser_1.default)
    .post(quizCreateController_1.default)
    .get(quizGetAllController_1.default);
// /api/classrooms/quizzes/admin/:quizId
quizRoute
    .route("/admin/:quizId")
    .all(verifyToken_1.default, verifyTokenKey_1.default, verifyClassroomUserAvailable_1.default, verifyClassroomUser_1.default)
    .get(quizGetController_1.default)
    .patch(quizUpdateController_1.default)
    .delete(quizDeleteController_1.default);
exports.default = quizRoute;
