import useQuiz from "@/hooks/useQuiz";
import { TimerReset } from "lucide-react";
import { useEffect, useState } from "react";

const CountdownTimer = ({ timeLimit }: { timeLimit: number }) => {
  const { resetTimer, handleNextQuestion } = useQuiz();
  const [countdown, setCountdown] = useState<number>(timeLimit);

  useEffect(() => {
    if (countdown <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown, handleNextQuestion]);

  useEffect(() => {
    if (resetTimer > 0) {
      setCountdown(timeLimit);
    }
  }, [resetTimer, timeLimit]);

  return (
    <div className="flex select-none items-center justify-center gap-2 font-bold text-primary">
      <span>
        <TimerReset className="stroke-primary" size={25} />
      </span>
      <span className="mt-0.5">{countdown}</span>
    </div>
  );
};

export default CountdownTimer;
