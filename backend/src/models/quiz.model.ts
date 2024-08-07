import { Schema, model } from "mongoose";
import type { Quiz, QuizAnswer } from "../types/quiz.type";

const participantSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: "answer",
    },
  },
  { _id: false }
);

const quizSchema = new Schema<Quiz>(
  {
    title: { type: String, required: [true, "Title is required"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Author id is required"],
    },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: "classroom",
      required: [true, "Classroom id is required"],
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
    totalQuestions: {
      type: Number,
      required: [true, "total question is required"],
    },
    totalMarks: {
      type: Number,
      required: [true, "total mark is required"],
    },
    participants: {
      type: [participantSchema],
    },
    startTime: { type: Date, required: [true, "Start time is required"] },
  },
  { timestamps: true }
);

const quizModel = model<Quiz>("quiz", quizSchema);

const quizAnswerSchema = new Schema<QuizAnswer>(
  {
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "quiz",
      required: [true, "quiz id is required"],
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },
    answers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "answer",
        },
      ],
      required: [true, "Question is required"],
    },
    totalMarks: {
      type: Number,
      required: [true, "total mark is required"],
    },
    totalAnswers: {
      type: Number,
      required: [true, "total answer is required"],
    },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: "classroom",
      required: [true, "classroom id is required"],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const quizAnswerModel = model<QuizAnswer>("quiz-answer", quizAnswerSchema);

export { quizModel, quizAnswerModel };
