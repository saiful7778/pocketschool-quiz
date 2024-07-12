import type { quizSchema } from "@/lib/schemas/quizSchema";
import { z } from "zod";
import type { AnswerType, Question } from "./question";

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
  totalQuestions: number;
  totalMarks: number;
  participantCount: number;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizData {
  _id: string;
  title: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  participants: {
    user: {
      _id: string;
      fullName: string;
      email: string;
    };
    answer: {
      _id: string;
      totalMarks: number;
      totalAnswers: number;
      createdAt: Date;
    };
  }[];
  totalQuestions: number;
  totalMarks: number;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: update
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

type multipleOption = number;
type multipleAnswer = number[];
type textAnswer = string;
type pinPointAnswer = { x: number; y: number };

export interface Answer {
  _id: string;
  answerType: AnswerType;
  answer: multipleOption | multipleAnswer | textAnswer | pinPointAnswer | null;
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
  successAnswers: {
    count: number;
    answers: SubmitAnswer[];
  };
  failedAnswers: {
    count: number;
    answers: SubmitAnswer[];
  };
}
