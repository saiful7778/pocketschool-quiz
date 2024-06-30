import { QuizContext } from "@/context/QuizContext";
import { useContext } from "react";

export default function useQuiz() {
  const context = useContext(QuizContext);
  if (context === null) {
    throw new Error("error from useQuiz hook");
  }
  return context;
}
