import { cn } from "@/lib/utils/shadcn";
import type { MultipleAnswer, MultipleAnswerAnswer } from "@/types";
import { CircleCheckBig, X } from "lucide-react";

interface MultipleAnswerQuestionItemProps {
  options: MultipleAnswer["options"];
  correctAnswerIndices: MultipleAnswer["correctAnswerIndices"];
  answerIndices: MultipleAnswerAnswer["answerIndices"];
}

const MultipleAnswerQuestionItem: React.FC<MultipleAnswerQuestionItemProps> = ({
  options,
  correctAnswerIndices,
  answerIndices,
}) => {
  return (
    <>
      {options.map((option, idx) => (
        <Options
          key={`multiple-anwer-${idx}`}
          text={option.text}
          correctAnswer={correctAnswerIndices.includes(idx)}
          answer={answerIndices.includes(idx)}
        />
      ))}
    </>
  );
};

const Options = ({
  text,
  correctAnswer,
  answer,
}: {
  text: string;
  correctAnswer: boolean;
  answer: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-md border border-sky-200 p-4 text-sm leading-none duration-100",
        correctAnswer
          ? "border-primary-foreground bg-primary text-primary-foreground"
          : answer &&
              "border-destructive-foreground bg-destructive text-destructive-foreground",
      )}
    >
      {correctAnswer ? (
        <span>
          <CircleCheckBig className="stroke-primary-foreground" size={20} />
        </span>
      ) : (
        answer && (
          <span>
            <X className="stroke-primary-foreground" size={20} />
          </span>
        )
      )}
      <span className="mr-auto">{text}</span>
      {correctAnswer && (
        <span className="text-xs italic opacity-80">Correct answer</span>
      )}
      {answer && <span className="text-xs italic opacity-80">Your answer</span>}
    </div>
  );
};

export default MultipleAnswerQuestionItem;
