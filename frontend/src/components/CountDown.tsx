import type { LayoutProps } from "@/types/layout";
import { FC, useEffect, useState } from "react";

interface CountDownProps extends LayoutProps {
  time: Date;
}

function calculateTimeRemaining(startTime: string | Date) {
  const start = new Date(startTime).getTime();
  const now = new Date().getTime();
  return start - now;
}

const CountDown: FC<CountDownProps> = ({ time, children }) => {
  const [timeRemain, setTimeRemain] = useState(calculateTimeRemaining(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemain(calculateTimeRemaining(time));
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  if (timeRemain <= 0) {
    return children;
  }

  const hours = Math.floor(timeRemain / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemain % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemain % (1000 * 60)) / 1000);

  return (
    <div className="my-16 flex flex-col items-center justify-center gap-2">
      <div className="text-5xl font-semibold">{`${hours}h ${minutes}m ${seconds}s`}</div>
      <h6 className="text-muted-foreground">Quiz starting remaining time</h6>
    </div>
  );
};

export default CountDown;
