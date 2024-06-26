"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputCheck_1 = __importDefault(require("../../../../utils/inputCheck"));
const devDebug_1 = __importDefault(require("../../../../utils/devDebug"));
const serverHelper_1 = __importDefault(require("../../../../utils/serverHelper"));
// models
const quizModel_1 = require("../../../../models/quizModel");
function quizCreateController(req, res) {
    // get data
    const { userId, classroomId } = req.query;
    const { title, questions, startTime } = req.body;
    // validate
    const check = (0, inputCheck_1.default)([title, questions, startTime], res);
    if (!check)
        return;
    if (!Array.isArray(questions)) {
        res.status(400).send({
            success: false,
            message: "Questions must be an array",
        });
        (0, devDebug_1.default)("invalid questions");
        return;
    }
    if (questions.length === 0) {
        res.status(400).send({
            success: false,
            message: "Questions array is empty",
        });
        (0, devDebug_1.default)("question array in empty");
        return;
    }
    const isQuestionsAvailable = questions.map((question) => {
        if (!question?.questionType ||
            !question?.questionText ||
            !question?.timeLimit ||
            !question?.marks) {
            return undefined;
        }
        return question;
    });
    if (isQuestionsAvailable.includes(undefined)) {
        res.status(400).send({
            success: false,
            message: "Question data not available",
        });
        (0, devDebug_1.default)("invalid question data");
        return;
    }
    (0, serverHelper_1.default)(async () => {
        const quizQuestions = await Promise.all(questions.map(async (question) => {
            switch (question.questionType) {
                case "multipleOption":
                    return quizModel_1.multipleOptionsQuestion.create(question);
                case "multipleAnswers":
                    return quizModel_1.multipleAnswersQuestion.create(question);
                case "textAnswer":
                    return quizModel_1.textAnswerQuestion.create(question);
                case "pinPointerAnswer":
                    return quizModel_1.pinPointerAnswerQuestion.create(question);
                default:
                    throw new Error("Invalid question type");
            }
        }));
        await quizModel_1.quizModel.create({
            title,
            author: userId,
            classroom: classroomId,
            questions: quizQuestions.map((question) => question._id),
            startTime,
        });
        res.status(201).send({
            success: true,
            message: "Quiz is created",
        });
    }, res);
}
exports.default = quizCreateController;
