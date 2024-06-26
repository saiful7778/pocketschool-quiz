import type { Types } from "mongoose";

export interface Quiz {
  _id: Types.ObjectId | string;
  title: string;
  author: Types.ObjectId | string;
  classroom: Types.ObjectId | string;
  questions: Types.ObjectId[] | string[];
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface Question {
  _id: Types.ObjectId | string;
  questionType?:
    | "multipleOption"
    | "multipleAnswers"
    | "textAnswer"
    | "pinPointerAnswer";
  questionText: string;
  timeLimit: number;
  marks: number;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface Option {
  text: string;
}

export interface MultipleOptionsQuestion {
  options: Option[];
  correctAnswerIndex: number;
}

export interface MultipleAnswersQuestion {
  options: Option[];
  correctAnswerIndices: number[];
}

export interface TextAnswerQuestion {
  correctAnswer: string;
}

export interface PinPointerAnswerQuestion {
  correctAnswer: {
    x: string;
    y: string;
  };
}
