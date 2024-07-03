import useQuiz from "@/hooks/useQuiz";
import { ReactNode, useEffect, useRef, useState } from "react";
import Button from "../ui/button";

const StartQuiz = ({
  startTime,
  children,
}: {
  startTime: Date;
  children: ReactNode;
}) => {
  const { startQuiz } = useQuiz();

  return startQuiz ? children : <StartQuizCountDown startTime={startTime} />;
};

const StartQuizCountDown = ({ startTime }: { startTime: Date }) => {
  const targetTime = new Date(startTime).getTime();
  const { handleStartQuiz, questionLimit } = useQuiz();

  const [time, setTime] = useState<number>(
    Math.floor((targetTime - Date.now()) / 1000),
  );

  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (time < 0) return;

    if (displayRef.current) {
      const timer = setInterval(() => {
        if (displayRef.current) {
          displayRef.current.textContent = formatTime(time);
        }
        setTime((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [time]);

  if (time >= 0) {
    return (
      <div className="space-y-2 text-center">
        <div>Quiz will start in:</div>
        <div className="text-6xl font-semibold" ref={displayRef} />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <div className="text-xl font-semibold">
        Total {questionLimit} questions
      </div>
      <div className="text-sm italic text-muted-foreground">
        Click to start quiz now
      </div>
      <Button size="lg" onClick={handleStartQuiz}>
        Start Quiz
      </Button>
    </div>
  );
};

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
};

export default StartQuiz;
