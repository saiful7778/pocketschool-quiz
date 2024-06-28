import { model, Schema } from "mongoose";
import type {
  MultipleOption,
  MultipleAnswer,
  TextAnswer,
  PinPointAnswer,
  Option,
  Question,
  Quiz,
} from "../types/quizType";

// Base Question Schema
const questionSchema = new Schema<Question>(
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
  { discriminatorKey: "questionType", _id: false, strict: false }
);

const optionSchema = new Schema<Option>({
  text: {
    type: String,
    required: [true, "option text is required"],
  },
});

// multiple options with single answer (4 or 2 options)
const multipleOptionSchema = new Schema<MultipleOption>({
  options: {
    type: [optionSchema],
    min: [1, "options minimum 1"],
    max: [5, "options maximum 5"],
    required: [true, "options is required"],
  },
  correctAnswerIndex: {
    type: Number,
    min: [0, "correct answer index is minimum 0"],
    max: [4, "correct answer index is maximum 4"],
    required: [true, "correct answer index is required"],
  },
});

// multiple Choice Question with multiple answers
const multipleAnswerSchema = new Schema<MultipleAnswer>({
  options: {
    type: [optionSchema],
    min: [1, "options minimum 1"],
    max: [5, "options maximum 5"],
    required: [true, "options is required"],
  },
  correctAnswerIndices: {
    type: [
      {
        type: Number,
        min: [0, "correct answer indices is minimum 0"],
        max: [4, "correct answer indices is maximum 4"],
        required: [true, "correct answer indices is required"],
      },
    ],
    min: [1, "correct answer indices is minimum 1"],
    max: [5, "correct answer indices is maximum 5"],
    required: [true, "correct answer indices is required"],
  },
});

// Plain Text Answer Question
const textAnswerSchema = new Schema<TextAnswer>({
  correctAnswer: {
    type: String,
    required: [true, "correct answer is required"],
  },
});

// Pin pointer Answer Question
const pinPointAnswerSchema = new Schema<PinPointAnswer>({
  correctPinPointAnswer: {
    x: { type: Number, required: [true, "x value is required"] },
    y: { type: Number, required: [true, "y value is required"] },
  },
});

// Quiz Schema
const quizSchema = new Schema<Quiz>(
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
    questions: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "question",
        },
      ],
      required: [true, "Question is required"],
    },
    // participants: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "user",
    //     },
    //   ],
    // },
    startTime: { type: Date, required: [true, "Start time is required"] },
  },
  { timestamps: true }
);

const questionModel = model<Question>("question", questionSchema);

quizSchema.pre("findOneAndDelete", async function (next) {
  const quiz = await this.model.findOne(this.getFilter());

  if (quiz) {
    await questionModel.deleteMany({ _id: { $in: quiz.questions } });
  }

  next();
});

const quizModel = model<Quiz>("quiz", quizSchema);

const multipleOptionQuestion = questionModel.discriminator<MultipleOption>(
  "multipleOption",
  multipleOptionSchema
);

const multipleAnswerQuestion = questionModel.discriminator<MultipleAnswer>(
  "multipleAnswer",
  multipleAnswerSchema
);

const textAnswerQuestion = questionModel.discriminator<TextAnswer>(
  "textAnswer",
  textAnswerSchema
);

const pinPointAnswerQuestion = questionModel.discriminator<PinPointAnswer>(
  "pinPointAnswer",
  pinPointAnswerSchema
);

export {
  quizModel,
  questionModel,
  multipleOptionQuestion,
  multipleAnswerQuestion,
  textAnswerQuestion,
  pinPointAnswerQuestion,
};
