import useQuiz from "@/hooks/useQuiz";
import { MessageCircleCode, TimerReset } from "lucide-react";
import { FC, ReactNode, memo, useEffect, useState } from "react";

interface QuestionAnswerBaseProps {
  children: ReactNode;
  questionNO: number;
  questionText: string;
  timeLimit: number;
}

const QuestionAnswerBase: FC<QuestionAnswerBaseProps> = ({
  questionNO,
  questionText,
  // timeLimit,
  children,
}) => {
  const timeLimit = 5;
  const [countdown, setCountdown] = useState<number>(timeLimit);
  const {
    questionIdx,
    handleNextQuestionIdx,
    handleNullAnswer,
    questionLimit,
    resetTimer,
  } = useQuiz();

  useEffect(() => {
    if (resetTimer > 0) {
      setCountdown(timeLimit);
    }
  }, [resetTimer, setCountdown, timeLimit]);

  useEffect(() => {
    if (countdown <= 0) {
      handleNullAnswer();
      return () => {};
    }
  }, [countdown, handleNullAnswer]);

  useEffect(() => {
    if (countdown <= 0) {
      return () => {};
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown, questionIdx]);

  useEffect(() => {
    if (countdown === 0) {
      if (questionIdx < questionLimit - 1) {
        handleNextQuestionIdx();
        setCountdown(timeLimit);
      }
    }
  }, [countdown, handleNextQuestionIdx, timeLimit, questionIdx, questionLimit]);

  return (
    <div className="w-full max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex select-none items-center justify-center gap-2 font-bold text-muted-foreground">
          <span>
            <MessageCircleCode className="stroke-muted-foreground" />
          </span>
          <span>{questionNO}</span>
        </div>
        <div className="flex select-none items-center justify-center gap-2 font-bold text-primary">
          <span>
            <TimerReset className="stroke-primary" size={25} />
          </span>
          <span className="mt-0.5">{countdown}</span>
        </div>
      </div>
      <div className="space-y-6 rounded-lg border border-t-4 border-t-primary p-4 shadow-sm">
        <h2 className="text-center text-2xl font-semibold">{questionText}</h2>
        <MemoizedChildren>{children}</MemoizedChildren>
      </div>
    </div>
  );
};

const MemoizedChildren = memo(({ children }: { children: ReactNode }) => {
  return <>{children}</>;
});

export default QuestionAnswerBase;
