import { Schema, model } from "mongoose";
import type {
  AnswerBase,
  MultipleAnswer,
  MultipleAnswerAnswer,
  MultipleOption,
  MultipleOptionAnswer,
  Option,
  PinPointAnswer,
  PinPointAnswerAnswer,
  QuestionBase,
  TextAnswer,
  TextAnswerAnswer,
} from "../types/question.type";

const questionBaseSchema = new Schema<QuestionBase>(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
    },
    index: {
      type: Number,
      min: [0, "index minimum 0"],
      max: [50, "index maximum 50"],
      required: [true, "Question index is required"],
    },
    timeLimit: {
      type: Number,
      required: [true, "Question time limit is required"],
    },
    mark: { type: Number, required: [true, "Question mark is required"] },
  },
  { discriminatorKey: "questionType", collection: "questions" }
);

const questionModel = model<QuestionBase>("question", questionBaseSchema);

const optionSchema = new Schema<Option>(
  {
    text: {
      type: String,
      required: [true, "option text is required"],
    },
  },
  { _id: false }
);

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

const multipleOptionQuestion = questionModel.discriminator<MultipleOption>(
  "multipleOption",
  multipleOptionSchema
);

const multipleAnswerSchema = new Schema<MultipleAnswer>({
  options: {
    type: [optionSchema],
    min: [2, "options minimum 2"],
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

const multipleAnswerQuestion = questionModel.discriminator<MultipleAnswer>(
  "multipleAnswer",
  multipleAnswerSchema
);

const textAnswerSchema = new Schema<TextAnswer>({
  correctAnswer: {
    type: String,
    required: [true, "correct answer is required"],
  },
});

const textAnswerQuestion = questionModel.discriminator<TextAnswer>(
  "textAnswer",
  textAnswerSchema
);

const pinPointAnswerSchema = new Schema<PinPointAnswer>({
  correctPinPointAnswer: {
    x: { type: Number, required: [true, "x value is required"] },
    y: { type: Number, required: [true, "y value is required"] },
  },
});

const pinPointAnswerQuestion = questionModel.discriminator<PinPointAnswer>(
  "pinPointAnswer",
  pinPointAnswerSchema
);

const answerBaseSchema = new Schema<AnswerBase>(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: "question",
      required: [true, "question id is required"],
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "quiz",
      required: [true, "quiz id is required"],
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "participant id is required"],
    },
    index: {
      type: Number,
      required: [true, "Answer index is required"],
    },
    isCorrect: {
      type: Boolean,
      required: [true, "isCorrect is required"],
    },
    mark: {
      type: Number,
      required: [true, "mark is required"],
    },
  },
  { discriminatorKey: "answerType", collection: "answers" }
);

const answerModel = model<AnswerBase>("answer", answerBaseSchema);

const multipleOptionAnswerSchema = new Schema<MultipleOptionAnswer>({
  answerIndex: {
    type: Number,
    min: [0, "minimum is 0"],
    max: [4, "maximum is 4"],
  },
});

const multipleOptionAnswer = answerModel.discriminator<MultipleOptionAnswer>(
  "multipleOptionAnswer",
  multipleOptionAnswerSchema
);

const multipleAnswerAnswerSchema = new Schema<MultipleAnswerAnswer>({
  answerIndices: {
    type: [
      {
        type: Number,
        min: [0, "minimum is 0"],
        max: [4, "maximum is 4"],
      },
    ],
    min: [1, "minimum is 1"],
    max: [5, "maximum is 5"],
  },
});

const multipleAnswerAnswer = answerModel.discriminator<MultipleAnswerAnswer>(
  "multipleAnswerAnswer",
  multipleAnswerAnswerSchema
);

const textAnswerAnswerSchema = new Schema<TextAnswerAnswer>({
  answer: {
    type: String,
  },
});

const textAnswerAnswer = answerModel.discriminator<TextAnswerAnswer>(
  "textAnswerAnswer",
  textAnswerAnswerSchema
);

const pinPointAnswerAnswerSchema = new Schema<PinPointAnswerAnswer>({
  pinPointAnswer: {
    x: { type: Number },
    y: { type: Number },
  },
});

const pinPointAnswerAnswer = answerModel.discriminator<PinPointAnswerAnswer>(
  "pinPointAnswerAnswer",
  pinPointAnswerAnswerSchema
);

export {
  questionModel,
  multipleOptionQuestion,
  multipleAnswerQuestion,
  textAnswerQuestion,
  pinPointAnswerQuestion,
  answerModel,
  multipleOptionAnswer,
  multipleAnswerAnswer,
  textAnswerAnswer,
  pinPointAnswerAnswer,
};
