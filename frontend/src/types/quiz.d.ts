import type { questionSchema, quizSchema } from "@/lib/schemas/quizSchema";
import type { Control } from "react-hook-form";
import { z } from "zod";

export interface QuizzesRes {
  _id: string;
  title: string;
  questionsCount: number;
  newQuiz: boolean;
}

export interface Quizzes {
  _id: string;
  title: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  questionsCount: number;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  _id: string;
  title: string;
  question: z.infer<typeof questionSchema>;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizInput {
  control: Control<z.infer<typeof quizSchema>>;
  loading: boolean;
}

export interface AdminQuiz extends z.infer<typeof quizSchema> {
  _id: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizPublic {
  _id: string;
  title: string;
  questions: Question[];
  startTime: Date;
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
  mark: number;
  options?: { _id: string; text: string }[];
}

export interface Answer {
  _id: string;
  questionType?:
    | "multipleOption"
    | "multipleAnswer"
    | "textAnswer"
    | "pinPointAnswer";
  answer: number | number[] | string | { x: number; y: number } | null;
}

interface SubmitAnswer {
  question: string;
  quiz: string;
  participant: string;
  isCorrect: boolean;
  mark: number;
}

export interface SubmitResult {
  totalQuestions: number;
  totalMarks: number;
  successAnswers: SubmitAnswer[];
  failedAnswers: SubmitAnswer[];
}
