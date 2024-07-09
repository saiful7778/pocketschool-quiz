import useQuiz from "@/hooks/useQuiz";
import { FC, useState } from "react";
import type { questionType } from "@/types/question";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";

interface MultipleOptionQuestionAnswerProps {
  options: { _id: string; text: string }[];
  questionId: string;
  questionType: questionType;
}

const MultipleOptionQuestionAnswer: FC<MultipleOptionQuestionAnswerProps> = ({
  options,
  questionId,
  questionType,
}) => {
  const { handleSubmitAnswer, handleNextQuestion } = useQuiz();
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedOption, setCheckedOption] = useState<{
    _id: string;
    idx: number;
  }>({ _id: "", idx: 0 });

  const handleClick = (_id: string, idx: number) => {
    setChecked(true);
    setCheckedOption({ _id, idx });
    setTimeout(() => {
      handleSubmitAnswer(questionId, idx, questionType);
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
            checked={checked && idx === checkedOption.idx}
            onClick={() => handleClick(option._id, idx)}
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
