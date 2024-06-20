import { quizSchema } from "@/lib/schemas/quizSchema";
import { User } from "./user";
import { z } from "zod";
import { Control } from "react-hook-form";

export interface Quiz {
  title: string;
  startTime: Date;
}

export interface Quizzes {
  _id: string;
  title: string;
  author: {
    _id: User["_id"];
    fullName: User["fullName"];
    email: User["email"];
  };
  startTime: Date;
  createdAt: Date;
}

export interface InputProps {
  control: Control<z.infer<typeof quizSchema>>;
  loading: boolean;
}

export interface AllQuestions {
  id: string;
  question: string;
  options?: string[] | undefined;
  type:
    | "multipleOptions"
    | "multipleAnswers"
    | "textAnswer"
    | "pinPointerAnswer";
  timeLimit: number;
  mark: number;
}
