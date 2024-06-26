"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../../utils/serverHelper"));
const quizModel_1 = require("../../../../models/quizModel");
function quizGetController(req, res) {
    // get data
    const quizId = req.params.quizId;
    (0, serverHelper_1.default)(async () => {
        const quiz = await quizModel_1.quizModel
            .findOne({ _id: quizId }, { classroom: 0 })
            .populate({ path: "questions" })
            .populate({ path: "author", select: ["_id", "fullName", "email"] });
        res.status(200).send({ success: true, data: quiz });
    }, res);
}
exports.default = quizGetController;
