import Button from "@/components/ui/button";
import useQuiz from "@/hooks/useQuiz";
import { CircleCheckBig } from "lucide-react";
import { FC, useState } from "react";

interface MultipleAnswerQuestionAnswerProps {
  options: { _id: string; text: string }[];
  questionId: string;
}

const MultipleAnswerQuestionAnswer: FC<MultipleAnswerQuestionAnswerProps> = ({
  options,
  questionId,
}) => {
  const { handleNextQuestionIdx, handleResetTimer, handleSetQuestionAnswer } =
    useQuiz();
  const [Loading, setLoading] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<{ idx: number }[]>([]);
  const [errorStatus, setErrorStatus] = useState<string>("");

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      setLoading(true);
      handleNextQuestionIdx();
      handleResetTimer();
      handleSetQuestionAnswer(
        questionId,
        selectedOptions.map((ele) => ele.idx),
      );
    } else {
      setErrorStatus("Select options");
    }
  };

  return (
    <>
      <div className="text-center text-sm italic text-muted-foreground">
        Multiple option answer
      </div>
      <div className="space-y-2">
        {options.map((option, idx) => (
          <AnswerOptions
            key={`multiple-anwer-${idx}`}
            disabled={Loading}
            text={option.text}
            handleOptionSubmit={() =>
              setSelectedOptions((prevs) =>
                prevs.find((prev) => prev.idx === idx)
                  ? prevs.filter((prev) => prev.idx !== idx)
                  : [...prevs, { idx }],
              )
            }
          />
        ))}
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Submit
      </Button>
      {errorStatus && (
        <p className="text-center text-sm font-medium text-destructive">
          {errorStatus}
        </p>
      )}
    </>
  );
};

const AnswerOptions = ({
  text,
  handleOptionSubmit,
  disabled,
}: {
  text: string;
  handleOptionSubmit: () => void;
  disabled: boolean;
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 rounded-md border p-4 leading-none disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      onClick={() => {
        setChecked((prev) => !prev);
        handleOptionSubmit();
      }}
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

export default MultipleAnswerQuestionAnswer;
