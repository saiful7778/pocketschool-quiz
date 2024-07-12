import type { LayoutProps } from "@/types/types";
import type { Question } from "@/types/question";
import type { Answer } from "@/types/quiz";
import { FC, createContext, useCallback, useState } from "react";

interface QuizContextProps {
  reFetchData: () => void;
  allQuestions: Question[];
  answers: Answer[];
  startQuiz: boolean;
  handleStartQuiz: () => void;
  currentQuestion: Question;
  resetTimer: number;
  questionIdx: number;
  questionLimit: number;
  handleNextQuestion: () => void;
  handleSubmitAnswer: (
    questionId: Answer["_id"],
    answer: Answer["answer"],
    answerType: Answer["answerType"],
  ) => void;
  complateQuiz: boolean;
}

export const QuizContext = createContext<QuizContextProps | null>(null);

interface QuizContextProviderProps extends Readonly<LayoutProps> {
  allQuestions: Question[];
  reFetchQuizData: () => void;
}

const QuizContextProvider: FC<QuizContextProviderProps> = ({
  allQuestions,
  reFetchQuizData,
  children,
}) => {
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [complateQuiz, setComplateQuiz] = useState<boolean>(false);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [resetTimer, setResetTimer] = useState<number>(0);

  const currentQuestion = allQuestions[questionIdx];
  const questionLimit = allQuestions.length;

  const handleStartQuiz = () => {
    setStartQuiz((prop) => !prop);
  };

  const handleNextQuestion = useCallback(() => {
    setQuestionIdx((prev) => {
      if (prev < questionLimit - 1) {
        setResetTimer((prev) => prev + 1);
        return prev + 1;
      } else {
        setComplateQuiz(true);
        return prev;
      }
    });
  }, [questionLimit]);

  const handleSubmitAnswer = useCallback(
    (
      questionId: string,
      answer: Answer["answer"],
      answerType: Answer["answerType"],
    ) => {
      setAnswers((prev) => [...prev, { _id: questionId, answer, answerType }]);
    },
    [],
  );

  const reFetchData = useCallback(reFetchQuizData, [reFetchQuizData]);

  return (
    <QuizContext.Provider
      value={{
        reFetchData,
        allQuestions,
        answers,
        startQuiz,
        handleStartQuiz,
        currentQuestion,
        resetTimer,
        questionIdx,
        questionLimit,
        handleNextQuestion,
        handleSubmitAnswer,
        complateQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;
