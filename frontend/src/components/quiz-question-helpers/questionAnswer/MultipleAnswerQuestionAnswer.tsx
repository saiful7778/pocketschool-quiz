import Button from "@/components/ui/button";
import useQuiz from "@/hooks/useQuiz";
import { cn } from "@/lib/utils/shadcn";
import type { AnswerType, Option } from "@/types/question";
import { CircleCheckBig } from "lucide-react";
import { FC, useState } from "react";

interface MultipleAnswerQuestionAnswerProps {
  options: Option[];
  questionId: string;
  answerType: AnswerType;
}

const MultipleAnswerQuestionAnswer: FC<MultipleAnswerQuestionAnswerProps> = ({
  options,
  questionId,
  answerType,
}) => {
  const { handleSubmitAnswer, handleNextQuestion } = useQuiz();
  const [Loading, setLoading] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [errorStatus, setErrorStatus] = useState<string>("");

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      setLoading(true);
      setTimeout(() => {
        handleSubmitAnswer(questionId, selectedOptions, answerType);
        handleNextQuestion();
      }, 500);
    } else {
      setErrorStatus("Select options");
    }
  };

  return (
    <>
      <div className="space-y-2">
        {options.map((option, idx) => (
          <AnswerOptions
            key={`multiple-anwer-${idx}`}
            disabled={Loading}
            text={option.text}
            handleOptionSubmit={() =>
              setSelectedOptions((prevs) =>
                prevs.find((prev) => prev === idx)
                  ? prevs.filter((prev) => prev !== idx)
                  : [...prevs, idx],
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
      className={cn(
        "group flex w-full items-center gap-2 rounded-md border border-sky-200 p-4 text-sm leading-none duration-100 hover:border-primary-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50",
        checked &&
          "border-primary-foreground bg-primary text-primary-foreground",
      )}
      disabled={disabled}
      onClick={() => {
        setChecked((prev) => !prev);
        handleOptionSubmit();
      }}
    >
      {checked ? (
        <CircleCheckBig
          className={cn(
            "stroke-primary group-hover:stroke-primary-foreground",
            checked && "stroke-primary-foreground",
          )}
          size={16}
        />
      ) : (
        <div className="size-4 rounded border border-sky-200" />
      )}
      <span>{text}</span>
    </button>
  );
};

export default MultipleAnswerQuestionAnswer;
