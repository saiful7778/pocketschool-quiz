import type { quizSchema } from "@/lib/schemas/quizSchema";
import type { Control } from "react-hook-form";
import type { z } from "zod";

export * from "./toastTypes";
export * from "./apiResponse";
export * from "./user";
export * from "./quiz";
export * from "./question";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface ElementOpenProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InputFieldProps<T> {
  control: Control<z.infer<T>>;
  loading: boolean;
}

export interface QuestionInputFieldProps
  extends InputFieldProps<typeof quizSchema> {}
