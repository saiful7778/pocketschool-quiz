import { CheckCheck, X } from "lucide-react";
import { FC, ReactNode } from "react";

interface QuestionItemBaseProps {
  questionText: string;
  timeLimit: number;
  questionMarks: number;
  result: number;
  isCorrect: boolean;
  questionIdx: number;
  children: ReactNode;
}

const QuestionItemBase: FC<QuestionItemBaseProps> = ({
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
      <h2 className="mb-6 text-center text-2xl font-semibold">
        {questionIdx}. {questionText}
      </h2>
      <div>
        <span>Time limit: </span> <span>{timeLimit}s</span>
      </div>
      <div>
        <span>Question mark: </span> <span>{questionMarks}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Result: </span>
        <span>{result}</span>
        {isCorrect ? (
          <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
            <CheckCheck size={15} />
          </span>
        ) : (
          <span className="flex size-6 items-center justify-center rounded bg-destructive text-destructive-foreground">
            <X size={15} />
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default QuestionItemBase;
