import type { Types } from "mongoose";

export interface QuestionBase {
  _id: Types.ObjectId | string;
  questionType?:
    | "multipleOption"
    | "multipleAnswer"
    | "textAnswer"
    | "pinPointAnswer";
  questionText: string;
  timeLimit: number;
  mark: number;
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

export interface AnswerBase {
  _id: Types.ObjectId | string;
  question: Types.ObjectId | string;
  questionType?:
    | "multipleOption"
    | "multipleAnswer"
    | "textAnswer"
    | "pinPointAnswer";
  quiz: Types.ObjectId | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer?: number[] | number | string | { x: number; y: number } | null | any;
  participant: Types.ObjectId | string;
  isCorrect: boolean;
  mark: number;
  __v?: number;
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
  };
}
