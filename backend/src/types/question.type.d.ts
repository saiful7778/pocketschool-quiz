import type { Types } from "mongoose";

export type QuestionType =
  | "multipleOption"
  | "multipleAnswer"
  | "textAnswer"
  | "pinPointAnswer";

export interface QuestionBase {
  _id: Types.ObjectId | string;
  title: string;
  index: number;
  timeLimit: number;
  mark: number;
  questionType: QuestionType;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export type Option = {
  text: string;
};

export interface MultipleOption extends QuestionBase {
  options: Option[];
  correctAnswerIndex: number;
}

export interface MultipleAnswer extends QuestionBase {
  options: Option[];
  correctAnswerIndices: number[];
}

export interface TextAnswer extends QuestionBase {
  correctAnswer: string;
}

export interface PinPointAnswer extends QuestionBase {
  correctPinPointAnswer: {
    x: string;
    y: string;
  };
}

export type AnswerType =
  | "multipleOptionAnswer"
  | "multipleAnswerAnswer"
  | "textAnswerAnswer"
  | "pinPointAnswerAnswer";

export interface AnswerBase {
  _id: Types.ObjectId | string;
  question: Types.ObjectId | string;
  quiz: Types.ObjectId | string;
  participant: Types.ObjectId | string;
  index: number;
  isCorrect: boolean;
  mark: number;
  answerType: AnswerType;
  __v: number;
}

export interface MultipleOptionAnswer extends AnswerBase {
  answerIndex: number | null;
}

export interface MultipleAnswerAnswer extends AnswerBase {
  answerIndices: number[] | null;
}

export interface TextAnswerAnswer extends AnswerBase {
  answer: string | null;
}

export interface PinPointAnswerAnswer extends AnswerBase {
  pinPointAnswer: {
    x: string | null;
    y: string | null;
  } | null;
}
