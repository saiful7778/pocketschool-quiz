import type { quizSchema } from "@/lib/schemas/quizSchema";
import type { z } from "zod";
import type { AnswerType } from "./question";
import type { ClassroomUser } from "./user";

export interface NewQuiz {
  _id: string;
  title: string;
  totalQuestions: number;
}

export interface AnswerQuiz {
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

export interface AdminQuizzes {
  _id: string;
  title: string;
  totalQuestions: number;
  totalMarks: number;
  participantCount: number;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Participant {
  user: ClassroomUser["user"];
  answer: {
    _id: string;
    totalMarks: number;
    totalAnswers: number;
    createdAt: Date;
  };
}

interface QuizData extends z.infer<typeof quizSchema> {
  _id: string;
  author: ClassroomUser["user"];
  totalQuestions: number;
  participants: Participant[];
  totalMarks: number;
  createdAt: Date;
  updatedAt: Date;
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
