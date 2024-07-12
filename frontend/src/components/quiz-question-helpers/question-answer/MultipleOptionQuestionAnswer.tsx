import useQuiz from "@/hooks/useQuiz";
import { useState } from "react";
import type { AnswerType, Option } from "@/types";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";

interface MultipleOptionQuestionAnswerProps {
  options: Option[];
  questionId: string;
  answerType: AnswerType;
}

const MultipleOptionQuestionAnswer: React.FC<
  MultipleOptionQuestionAnswerProps
> = ({ options, questionId, answerType }) => {
  const { handleSubmitAnswer, handleNextQuestion } = useQuiz();
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedOption, setCheckedOption] = useState<number | undefined>(
    undefined,
  );

  const handleClick = (idx: number) => {
    setChecked(true);
    setCheckedOption(idx);
    setTimeout(() => {
      handleSubmitAnswer(questionId, idx, answerType);
      handleNextQuestion();
    }, 500);
  };

  return (
    <>
      <div className="space-y-2">
        {options.map((option, idx) => (
          <QuizOption
            key={`multiple-option-${idx}`}
            text={option.text}
            disabled={checked}
            checked={checked && idx === checkedOption}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
    </>
  );
};

const QuizOption = ({
  text,
  onClick,
  checked,
  disabled,
}: {
  text: string;
  onClick: () => void;
  checked: boolean;
  disabled: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "group flex w-full items-center gap-2 rounded-md border border-sky-300 p-4 text-sm leading-none duration-100 hover:border-primary-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50",
        checked &&
          "border-primary-foreground bg-primary text-primary-foreground",
      )}
      disabled={disabled}
    >
      {checked && (
        <CircleCheckBig
          className={cn(
            "stroke-primary group-hover:stroke-primary-foreground",
            checked && "stroke-primary-foreground",
          )}
          size={20}
        />
      )}
      <span>{text}</span>
    </button>
  );
};

export default MultipleOptionQuestionAnswer;
