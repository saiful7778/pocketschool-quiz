import useQuiz from "@/hooks/useQuiz";
import { CircleCheckBig } from "lucide-react";
import { FC, useState } from "react";

interface MultipleOptionQuestionAnswerProps {
  options: { _id: string; text: string }[];
  questionId: string;
}

const MultipleOptionQuestionAnswer: FC<MultipleOptionQuestionAnswerProps> = ({
  options,
  questionId,
}) => {
  const { handleNextQuestionIdx, handleResetTimer, handleSetQuestionAnswer } =
    useQuiz();
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedOption, setCheckedOption] = useState<{
    _id: string;
    idx: number;
  }>({ _id: "", idx: 0 });

  const handleClick = (_id: string, idx: number) => {
    setChecked(true);
    setCheckedOption({ _id, idx });
    handleNextQuestionIdx();
    handleResetTimer();
    handleSetQuestionAnswer(questionId, idx);
  };

  return (
    <>
      <div className="text-center text-sm italic text-muted-foreground">
        Single option answer
      </div>
      <div className="space-y-2">
        {options.map((option, idx) => (
          <QuizOption
            key={`multiple-option-${idx}`}
            text={option.text}
            disabled={checked}
            checked={checked && checkedOption._id === option._id}
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
      className="flex w-full items-center gap-2 rounded-md border p-4 leading-none disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
    >
      {checked && (
        <span>
          <CircleCheckBig size={16} />
        </span>
      )}
      <span>{text}</span>
    </button>
  );
};

export default MultipleOptionQuestionAnswer;
