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
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <h2 className="font-semibold md:text-2xl">
          {questionIdx}. {questionText}
        </h2>
        <div className="ml-auto flex items-center gap-2 text-sm">
          {isCorrect ? (
            <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <CheckCheck size={15} />
            </span>
          ) : (
            <span className="flex size-6 items-center justify-center rounded bg-destructive text-destructive-foreground">
              <X size={15} />
            </span>
          )}
          <span>
            <TimerReset className="stroke-primary" size={25} />
          </span>
          <span className="mt-0.5">{timeLimit}s</span>
        </div>
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
