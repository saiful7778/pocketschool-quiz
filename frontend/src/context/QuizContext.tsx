import type { LayoutProps } from "@/types/layout";
import type { Question } from "@/types/quiz";
import { FC, createContext, useState } from "react";

interface QuizContextProps {
  allQuestions: Question[];
  currentQuestion: Question;
  startQuiz: boolean;
  handleStartQuiz: () => void;
  questionIdx: number;
  questionLimit: number;
  resetTimer: number;
  questionsAnswers: {
    _id: string;
    correctAnswerIndex?: number | undefined;
    correctAnswerIndices?: number[] | undefined;
    correctAnswer?: string | undefined;
  }[];
  handleNextQuestionIdx: () => void;
  handleResetTimer: () => void;
  handleSetQuestionAnswer: (
    _id: string,
    answer: number | number[] | string,
  ) => void;
  handleNullAnswer: () => void;
}

export const QuizContext = createContext<QuizContextProps | null>(null);

interface QuizContextProviderProps extends Readonly<LayoutProps> {
  allQuestions: Question[];
}

const QuizContextProvider: FC<QuizContextProviderProps> = ({
  allQuestions,
  children,
}) => {
  const [questionsAnswers, setQuestionsAnswers] = useState<
    {
      _id: string;
      answer: number | number[] | string | { x: number; y: number } | null;
    }[]
  >([]);
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [resetTimer, setResetTimer] = useState<number>(0);

  console.log(questionsAnswers);

  const currentQuestion = allQuestions[questionIdx];
  const questionLimit = allQuestions.length;

  const handleStartQuiz = () => {
    setStartQuiz((prop) => !prop);
  };

  const handleNextQuestionIdx = () => {
    setQuestionIdx((prev) =>
      prev < allQuestions.length - 1 ? prev + 1 : prev,
    );
  };

  const handleResetTimer = () => {
    setResetTimer((prev) => prev + 1);
  };

  const handleNullAnswer = () => {
    setQuestionsAnswers((prev) => [
      ...prev,
      { _id: currentQuestion._id, answer: null },
    ]);
  };

  const handleSetQuestionAnswer = (
    _id: string,
    answer: number | number[] | string,
  ) => {
    setQuestionsAnswers((prev) => [...prev, { _id, answer }]);
  };

  return (
    <QuizContext.Provider
      value={{
        allQuestions,
        currentQuestion,
        startQuiz,
        handleStartQuiz,
        questionIdx,
        questionLimit,
        resetTimer,
        questionsAnswers,
        handleNextQuestionIdx,
        handleResetTimer,
        handleSetQuestionAnswer,
        handleNullAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;
