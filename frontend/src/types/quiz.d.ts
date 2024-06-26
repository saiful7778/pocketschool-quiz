import type { questionSchema, quizSchema } from "@/lib/schemas/quizSchema";
import type { Control } from "react-hook-form";
import { z } from "zod";

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
