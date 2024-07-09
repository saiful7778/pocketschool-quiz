import { cn } from "@/lib/utils/shadcn";
import { MultipleOption, MultipleOptionAnswer } from "@/types/question";
import { CircleCheckBig, X } from "lucide-react";
import { FC } from "react";

interface MultipleOptionQuestionItemProps {
  options: MultipleOption["options"];
  correctAnswerIndex: MultipleOption["correctAnswerIndex"];
  answerIndex: MultipleOptionAnswer["answerIndex"] | null;
}

const MultipleOptionQuestionItem: FC<MultipleOptionQuestionItemProps> = ({
  options,
  correctAnswerIndex,
  answerIndex,
}) => {
  return (
    <>
      {answerIndex === null && <div>You didn't answer this question.</div>}
      <div className="space-y-2">
        {options.map((option, idx) => (
          <QuizOption
            key={`multiple-option-question-item-${idx}`}
            text={option.text}
            correctAnswer={correctAnswerIndex === idx}
            answer={answerIndex === idx}
          />
        ))}
      </div>
    </>
  );
};

const QuizOption = ({
  text,
  correctAnswer,
  answer,
}: {
  text: string;
  correctAnswer: boolean;
  answer: boolean;
}) => {
  return (
    <button
      type="button"
      className={cn(
        "group flex w-full items-center gap-2 rounded-md border border-sky-300 p-4 text-sm leading-none duration-100 active:bg-primary active:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50",
        correctAnswer &&
          "border-primary-foreground bg-primary text-primary-foreground",
        answer &&
          "border-destructive-foreground bg-destructive text-destructive-foreground",
      )}
    >
      {correctAnswer && (
        <span>
          <CircleCheckBig className="stroke-primary-foreground" size={20} />
        </span>
      )}
      {answer && (
        <span>
          <X className="stroke-primary-foreground" size={20} />
        </span>
      )}
      <span className="text-left">{text}</span>
      {correctAnswer && (
        <span className="ml-auto text-xs italic">Correct answer</span>
      )}
      {answer && <span className="ml-auto text-xs italic">Your answer</span>}
    </button>
  );
};

export default MultipleOptionQuestionItem;
