import type { quizSchema } from "@/lib/schemas/quizSchema";
import type { Control } from "react-hook-form";
import type { z } from "zod";

export interface QuestionInput {
  control: Control<z.infer<typeof quizSchema>>;
  loading: boolean;
}

export type questionType =
  | "multipleOption"
  | "multipleAnswer"
  | "textAnswer"
  | "pinPointAnswer";

export interface Question {
  _id: Types.ObjectId | string;
  questionType?: questionType;
  questionText: string;
  timeLimit: number;
  mark: number;
  options?: { _id: string; text: string }[];
}

export interface Answer {
  _id: string;
  questionType?: questionType;
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
