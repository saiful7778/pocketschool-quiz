import { FC } from "react";

interface CircleProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const CircleProgressBar: FC<CircleProgressBarProps> = ({
  percentage,
  size = 190,
  strokeWidth = 20,
}) => {
  const circumference = size * 3 - 40;
  const strokeDashoffset = circumference - circumference * percentage;

  return (
    <div
      className="CircleProgressBar relative rounded-full"
      style={
        {
          "--strokeDashoffset": strokeDashoffset,
          "--size": `${size}px`,
        } as React.CSSProperties
      }
    >
      <div className="flex h-full items-center justify-center text-3xl font-bold">
        {(percentage * 100).toFixed(0)}%
      </div>
      <svg
        className="absolute inset-0 -rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={size}
        height={size}
      >
        <circle
          className="fill-none stroke-primary"
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CircleProgressBar;
