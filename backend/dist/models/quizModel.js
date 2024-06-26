"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinPointerAnswerQuestion = exports.textAnswerQuestion = exports.multipleAnswersQuestion = exports.multipleOptionsQuestion = exports.questionModel = exports.quizModel = void 0;
const mongoose_1 = require("mongoose");
// Base Question Schema
const questionSchema = new mongoose_1.Schema({
    questionText: {
        type: String,
        required: [true, "Question text is required"],
    },
    timeLimit: {
        type: Number,
        required: [true, "Question time limit is required"],
    },
    marks: { type: Number, required: [true, "Question mark is required"] },
}, { discriminatorKey: "questionType", _id: false, strict: false });
const optionSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, "Option text is required"],
    },
});
// multiple options with single answer (4 or 2 options)
const multipleOptionsQuestionSchema = new mongoose_1.Schema({
    options: {
        type: [optionSchema],
        required: [true, "options is required"],
    },
    correctAnswerIndex: {
        type: Number,
        required: [true, "correct answer index is required"],
    },
});
// multiple Choice Question with multiple answers
const multipleAnswersQuestionSchema = new mongoose_1.Schema({
    options: {
        type: [optionSchema],
        required: [true, "options is required"],
    },
    correctAnswerIndices: [
        { type: Number, required: [true, "correct answer indices is required"] },
    ],
});
// Plain Text Answer Question
const textAnswerQuestionSchema = new mongoose_1.Schema({
    correctAnswer: { type: String, required: true },
});
// Pin pointer Answer Question
const pinPointerAnswerQuestionSchema = new mongoose_1.Schema({
    correctAnswer: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    },
});
// Quiz Schema
const quizSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is required"] },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Author is required"],
    },
    classroom: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "classroom",
        required: [true, "Classroom is required"],
    },
    questions: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "question",
            },
        ],
        required: [true, "Question is required"],
    },
    startTime: { type: Date, required: [true, "Start time is required"] },
}, { timestamps: true });
const questionModel = (0, mongoose_1.model)("question", questionSchema);
exports.questionModel = questionModel;
quizSchema.pre("findOneAndDelete", async function (next) {
    const quiz = await this.model.findOne(this.getFilter());
    if (quiz) {
        await questionModel.deleteMany({ _id: { $in: quiz.questions } });
    }
    next();
});
const quizModel = (0, mongoose_1.model)("quiz", quizSchema);
exports.quizModel = quizModel;
const multipleOptionsQuestion = questionModel.discriminator("multipleOption", multipleOptionsQuestionSchema);
exports.multipleOptionsQuestion = multipleOptionsQuestion;
const multipleAnswersQuestion = questionModel.discriminator("multipleAnswers", multipleAnswersQuestionSchema);
exports.multipleAnswersQuestion = multipleAnswersQuestion;
const textAnswerQuestion = questionModel.discriminator("textAnswer", textAnswerQuestionSchema);
exports.textAnswerQuestion = textAnswerQuestion;
const pinPointerAnswerQuestion = questionModel.discriminator("pinPointerAnswer", pinPointerAnswerQuestionSchema);
exports.pinPointerAnswerQuestion = pinPointerAnswerQuestion;
