"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../../utils/serverHelper"));
const quizModel_1 = require("../../../../models/quizModel");
const devDebug_1 = __importDefault(require("../../../../utils/devDebug"));
const mongoose_1 = require("mongoose");
function quizUpdateController(req, res) {
    const quizId = req.params.quizId;
    const { title, startTime, questions } = req.body;
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
        const quizData = (await quizModel_1.quizModel.findOne({ _id: quizId }, { questions: 1 }));
        const questionIds = await questionPromises(questions, quizData.questions);
        const quiz = await quizModel_1.quizModel.updateOne({
            _id: quizId,
        }, {
            title,
            startTime,
            questions: questionIds,
        });
        res.status(200).send({ success: true, data: quiz });
    }, res);
}
exports.default = quizUpdateController;
async function questionPromises(questions, quizQuestions) {
    const allPromises = [];
    const ids = [];
    const deleteAbleQuestions = quizQuestions.filter((questionId) => questions.find((question) => String(questionId) !== question?._id)
        ? true
        : false);
    if (deleteAbleQuestions.length > 0) {
        allPromises.push(...deleteAbleQuestions.map((deleteQuestion) => quizModel_1.questionModel.deleteOne({ _id: deleteQuestion })));
    }
    // const updateAbleQuestions = quizQuestions
    //   .map((quizQuestion) => String(quizQuestion))
    //   .filter((questionId) =>
    //     questions.find((question) => String(questionId) === question?._id) ? true : false
    //   );
    allPromises.push(...questions.map((question) => {
        // if (updateAbleQuestions.includes(question?._id as string)) {
        if (question?._id) {
            const { _id, ...questionData } = question;
            ids.push(_id);
            return quizModel_1.questionModel.updateOne({ _id: new mongoose_1.Types.ObjectId(_id) }, { ...questionData });
        }
        else {
            const newQuestionId = new mongoose_1.Types.ObjectId();
            ids.push(String(newQuestionId));
            return quizModel_1.questionModel.create({ _id: newQuestionId, ...question });
        }
    }));
    await Promise.all(allPromises);
    return ids;
}
