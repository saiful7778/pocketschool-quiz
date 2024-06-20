import { QuizFormContext } from "@/context/QuizFormContext";
import { useContext } from "react";

export default function useQuizForm() {
  const context = useContext(QuizFormContext);
  if (context === null) {
    throw new Error("useQuizForm hook error");
  }
  return context;
}
