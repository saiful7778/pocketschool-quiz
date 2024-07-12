import { X } from "lucide-react";
import { FormField } from "@/components/ui/form";
import InputField from "@/components/InputField";
import Button from "@/components/ui/button";
import type { QuestionInputFieldProps, questionType } from "@/types";

interface QuestionInputBaseProps extends QuestionInputFieldProps {
  index: number;
  removeQuestion: () => void;
  children: React.ReactNode;
  questionType: questionType;
}

const QuestionInputBase: React.FC<QuestionInputBaseProps> = ({
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

  // TODO: add negative marking
  return (
    <div className="relative space-y-4 rounded-md border-t-[4px] border-primary p-4 shadow">
      <div className="absolute right-2 top-2">
        <Button
          onClick={removeQuestion}
          size="icon"
          disabled={loading}
          variant="ghost"
          type="button"
        >
          <X size={18} />
        </Button>
      </div>
      <div className="!mt-0 select-none text-lg font-semibold">
        {index + 1}. {renderQuestionType()}
      </div>
      <FormField
        control={control}
        name={`questions.${index}.title`}
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
          name={`questions.${index}.mark`}
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

export default QuestionInputBase;
