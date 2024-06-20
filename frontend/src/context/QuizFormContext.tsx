import type { LayoutProps } from "@/types/layout";
import type { AllQuestions } from "@/types/quiz";
import { FC, createContext, useState } from "react";
import { v4 } from "uuid";

interface QuizFormContextProps {
  allQuestions: AllQuestions[];
  addNewQuestion: (options: {
    question: "";
    options?: string[] | undefined;
    type: AllQuestions["type"];
    timeLimit: number;
    mark: number;
  }) => void;
  deleteQuestion: (questionId: string) => void;
}

export const QuizFormContext = createContext<QuizFormContextProps | null>(null);

const QuizFormContextProvider: FC<Readonly<LayoutProps>> = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState<AllQuestions[]>([]);

  const addNewQuestion = (options: {
    question: string;
    options?: string[] | undefined;
    type: AllQuestions["type"];
    timeLimit: number;
    mark: number;
  }) => {
    setAllQuestions((props) => [
      ...props,
      {
        id: v4(),
        ...options,
      },
    ]);
  };

  const deleteQuestion = (questionId: string) => {
    setAllQuestions((props) =>
      props.filter((question) => question.id !== questionId),
    );
  };

  return (
    <QuizFormContext.Provider
      value={{ allQuestions, addNewQuestion, deleteQuestion }}
    >
      {children}
    </QuizFormContext.Provider>
  );
};

export default QuizFormContextProvider;
