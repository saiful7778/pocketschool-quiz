import { model, Schema } from "mongoose";

// Base Question Schema
const questionSchema = new Schema(
  {
    questionText: {
      type: String,
      required: [true, "Question text is required"],
    },
    timeLimit: {
      type: Number,
      required: [true, "Question time limit is required"],
    },
    marks: { type: Number, required: [true, "Question mark is required"] },
  },
  { discriminatorKey: "questionType", _id: false }
);

const optionSchema = new Schema({
  text: {
    type: String,
    required: [true, "Option text is required"],
  },
});

// multiple options with single answer (4 or 2 options)
const multipleOptionsQuestionSchema = new Schema({
  options: [optionSchema],
  correctAnswerIndex: { type: Number, required: true },
});

// multiple Choice Question with multiple answers
const multipleAnswersQuestionSchema = new Schema({
  options: [optionSchema],
  correctAnswerIndices: [{ type: Number, required: true }],
});

// Plain Text Answer Question
const textAnswerQuestionSchema = new Schema({
  correctAnswer: { type: String, required: true },
});

// Pin pointer Answer Question
const pinPointerAnswerQuestionSchema = new Schema({
  correctAnswer: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
});

// Quiz Schema
const quizSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Author is required"],
    },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: "classroom",
      required: [true, "Classroom is required"],
    },
    questions: [questionSchema],
    startTime: { type: Date, required: [true, "Start time is required"] },
  },
  { timestamps: true }
);

const quizModel = model("quiz", quizSchema);
const questionModel = model("question", questionSchema);

const multipleOptionsQuestion = questionModel.discriminator(
  "multipleOption",
  multipleOptionsQuestionSchema
);

const multipleAnswersQuestion = questionModel.discriminator(
  "multipleAnswers",
  multipleAnswersQuestionSchema
);

const textAnswerQuestion = questionModel.discriminator(
  "textAnswer",
  textAnswerQuestionSchema
);

const pinPointerAnswerQuestion = questionModel.discriminator(
  "pinPointerAnswer",
  pinPointerAnswerQuestionSchema
);

export {
  quizModel,
  questionModel,
  multipleOptionsQuestion,
  multipleAnswersQuestion,
  textAnswerQuestion,
  pinPointerAnswerQuestion,
};
