import { MessageCircleCode } from "lucide-react";
import { FC, ReactNode, memo } from "react";
import CountdownTimer from "./CountdownTimer";

interface QuestionAnswerBaseProps {
  children: ReactNode;
  questionNO: number;
  questionText: string;
  timeLimit: number;
  questionLimit: number;
}

const QuestionAnswerBase: FC<QuestionAnswerBaseProps> = ({
  questionNO,
  questionText,
  timeLimit,
  children,
  questionLimit,
}) => {
  return (
    <div className="w-full max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex select-none items-center justify-center gap-2 font-bold text-muted-foreground">
          <span>
            <MessageCircleCode className="stroke-muted-foreground" />
          </span>
          <span>
            {questionNO} of {questionLimit}
          </span>
        </div>
        <CountdownTimer timeLimit={timeLimit} />
      </div>
      <div className="rounded-lg border border-t-4 border-t-primary p-4 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          {questionText}
        </h2>
        <MemoizedChildren>{children}</MemoizedChildren>
      </div>
    </div>
  );
};

const MemoizedChildren = memo(({ children }: { children: ReactNode }) => {
  return <>{children}</>;
});

export default QuestionAnswerBase;
