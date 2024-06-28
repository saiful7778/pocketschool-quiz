import { FC, ReactNode } from "react";
import Button from "../ui/button";
import { X } from "lucide-react";
import { FormField } from "../ui/form";
import InputField from "../InputField";
import type { QuizInput } from "@/types/quiz";

interface QuestionProps extends QuizInput {
  index: number;
  removeQuestion: () => void;
  children: ReactNode;
  questionType:
    | "multipleOption"
    | "multipleAnswer"
    | "textAnswer"
    | "pinPointAnswer";
}

const Question: FC<QuestionProps> = ({
  control,
  loading,
  index,
  removeQuestion,
  questionType,
  children,
}) => {
  const renderQuestionType = () => {
    switch (questionType) {
      case "multipleOption":
        return "Multiple option (Single Answer)";
      case "multipleAnswer":
        return "Multiple option (Multiple Answer)";
      case "textAnswer":
        return "Text input answer";
      case "pinPointAnswer":
        return "Pin point answer";
    }
  };

  return (
    <div className="relative space-y-4 rounded-md border-t-2 border-primary p-4 shadow">
      <div className="absolute right-2 top-2">
        <Button
          onClick={removeQuestion}
          size="icon"
          disabled={loading}
          variant="ghost"
          type="button"
        >
          <X size={15} />
        </Button>
      </div>
      <div className="!mt-0 select-none text-lg font-semibold">
        {index + 1}. {renderQuestionType()}
      </div>
      <FormField
        control={control}
        name={`questions.${index}.questionText`}
        render={({ field }) => (
          <InputField
            type="text"
            label="Question"
            placeholder="Question title"
            disabled={loading}
            {...field}
          />
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`questions.${index}.timeLimit`}
          render={({ field }) => (
            <InputField
              type="number"
              label="Answer time (s)"
              placeholder="Time limit"
              min={10}
              max={120}
              disabled={loading}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <FormField
          control={control}
          name={`questions.${index}.marks`}
          render={({ field }) => (
            <InputField
              type="number"
              label="Marks"
              min={10}
              max={100}
              placeholder="Question marks"
              disabled={loading}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </div>
      {children}
    </div>
  );
};

export default Question;
