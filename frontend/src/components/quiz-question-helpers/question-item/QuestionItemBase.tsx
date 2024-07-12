import { CheckCheck, X, TimerReset } from "lucide-react";

interface QuestionItemBaseProps {
  questionText: string;
  timeLimit: number;
  questionMarks: number;
  result: number;
  isCorrect: boolean;
  questionIdx: number;
  children: React.ReactNode;
}

const QuestionItemBase: React.FC<QuestionItemBaseProps> = ({
  questionText,
  timeLimit,
  questionMarks,
  result,
  isCorrect,
  questionIdx,
  children,
}) => {
  return (
    <div className="space-y-2 rounded-lg border border-t-4 border-t-primary p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">
          {questionIdx}. {questionText}
        </h2>
        {isCorrect ? (
          <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
            <CheckCheck size={15} />
          </span>
        ) : (
          <span className="flex size-6 items-center justify-center rounded bg-destructive text-destructive-foreground">
            <X size={15} />
          </span>
        )}
        <span className="ml-auto">
          <TimerReset className="stroke-primary" size={25} />
        </span>
        <span className="mt-0.5">{timeLimit}s</span>
      </div>
      <div>
        <span>Mark: </span> <span>{questionMarks}</span>
        <div className="flex items-center gap-2">
          <span>Result: </span>
          <span>{result}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default QuestionItemBase;
