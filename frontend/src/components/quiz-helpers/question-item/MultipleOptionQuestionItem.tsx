import { cn } from "@/lib/utils/shadcn";
import { CircleCheckBig } from "lucide-react";
import { FC } from "react";

interface MultipleOptionQuestionItemProps {
  options: { _id: string; text: string }[];
  loading: boolean;
  checked: boolean;
  checkedOptionIdx: number;
  optionClick: (optionId: string, optionIdx: number) => void;
}

const MultipleOptionQuestionItem: FC<MultipleOptionQuestionItemProps> = ({
  options,
  checked,
  checkedOptionIdx,
  loading,
  optionClick,
}) => {
  return (
    <div className="space-y-2">
      {options.map((option, idx) => (
        <QuizOption
          key={`multiple-option-${idx}`}
          text={option.text}
          disabled={loading}
          checked={checked && idx === checkedOptionIdx}
          onClick={() => optionClick(option._id, idx)}
        />
      ))}
    </div>
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

export default MultipleOptionQuestionItem;
