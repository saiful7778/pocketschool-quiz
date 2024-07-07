import type { quizSchema } from "@/lib/schemas/quizSchema";
import { z } from "zod";

export interface NewQuizzesRes {
  _id: string;
  title: string;
  totalQuestions: number;
}

export interface AnswerQuizzesRes {
  _id: string;
  quiz: {
    _id: string;
    title: string;
    totalMarks: number;
    totalQuestions: number;
  };
  totalMarks: number;
  totalAnswers: number;
  createdAt: Date;
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
  participantCount: number;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminQuizDetails extends z.infer<typeof quizSchema> {
  _id: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
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
