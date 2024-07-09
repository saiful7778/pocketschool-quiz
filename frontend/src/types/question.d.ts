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

interface QuestionBase {
  _id: string;
  mark: number;
  questionText: string;
  questionType: questionType;
  timeLimit: number;
}

type Option = {
  text: string;
};

export interface MultipleOption extends QuestionBase {
  correctAnswerIndex: number;
  options: Option[];
}

export interface MultipleAnswer extends QuestionBase {
  correctAnswerIndices: number[];
  options: Option[];
}

export interface TextAnswer extends QuestionBase {
  correctAnswer: string;
}

export type Question = MultipleOption | MultipleAnswer | TextAnswer;

interface Answerbase {
  _id: string;
  mark: number;
  isCorrect: boolean;
  question: QuestionBase;
  answerType:
    | "multipleOptionAnswer"
    | "multipleAnswerAnswer"
    | "textAnswerAnswer"
    | "pinPointAnswerAnswer";
}

export interface MultipleOptionAnswer extends Answerbase {
  answerIndex: number;
}

export interface MultipleAnswerAnswer extends Answerbase {
  answerIndices: number[];
}

export interface TextAnswerAnswer extends Answerbase {
  answer: string;
}

export type Answers =
  | MultipleOptionAnswer
  | MultipleAnswerAnswer
  | TextAnswerAnswer;

export interface Result {
  _id: string;
  totalAnswers: number;
  totalMarks: number;
  quiz: string;
  answers: Answers[];
}
