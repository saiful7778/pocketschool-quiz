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
      {options.map((option, idx) => (
        <Option
          key={`multiple-option-question-item-${idx}`}
          text={option.text}
          correctAnswer={correctAnswerIndex === idx}
          answer={answerIndex === idx}
        />
      ))}
    </>
  );
};

const Option = ({
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
        "group flex w-full items-center gap-2 rounded-md border border-sky-300 p-4 text-sm leading-none duration-100 disabled:cursor-not-allowed disabled:opacity-50",
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
      <span className="mr-auto text-left">{text}</span>
      {correctAnswer && (
        <span className="text-xs italic opacity-80">Correct answer</span>
      )}
      {answer && <span className="text-xs italic opacity-80">Your answer</span>}
    </div>
  );
};

export default MultipleOptionQuestionItem;
