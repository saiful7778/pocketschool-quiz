import type { Types } from "mongoose";

export interface Quiz {
  _id: Types.ObjectId | string;
  title: string;
  author: Types.ObjectId | string;
  classroom: Types.ObjectId | string;
  questions: Types.ObjectId[] | string[];
  participants: Types.ObjectId[] | string[];
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface Option {
  text: string;
}

export interface MultipleOption {
  options: Option[];
  correctAnswerIndex: number;
}

export interface MultipleAnswer {
  options: Option[];
  correctAnswerIndices: number[];
}

export interface TextAnswer {
  correctAnswer: string;
}

export interface PinPointAnswer {
  correctPinPointAnswer: {
    x: string;
    y: string;
  };
}

export interface Question {
  _id: Types.ObjectId | string;
  questionType?:
    | "multipleOption"
    | "multipleAnswer"
    | "textAnswer"
    | "pinPointAnswer";
  questionText: string;
  timeLimit: number;
  marks: number;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
