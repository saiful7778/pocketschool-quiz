import type { Types } from "mongoose";

export interface Quiz {
  _id: Types.ObjectId | string;
  title: string;
  author: Types.ObjectId | string;
  classroom: Types.ObjectId | string;
  questions: Types.ObjectId[] | string[];
  participants: {
    user: Types.ObjectId | string;
    answer: Types.ObjectId | string;
  }[];
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface QuizAnswer {
  quiz: Types.ObjectId | string;
  participant: Types.ObjectId | string;
  classroom: Types.ObjectId | string;
  answers: Types.ObjectId[] | string[];
  totalMarks: number;
  totalAnswers: number;
  createdAt: Date;
  __v: number;
}
