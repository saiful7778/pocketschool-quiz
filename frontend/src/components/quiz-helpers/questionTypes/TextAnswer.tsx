import { FormField } from "@/components/ui/form";
import { FC } from "react";
import type { QuizInput } from "@/types/quiz";
import InputField from "@/components/InputField";

interface TextAnswerProps extends QuizInput {
  index: number;
}

const TextAnswer: FC<TextAnswerProps> = ({ control, index, loading }) => {
  return (
    <FormField
      control={control}
      name={`questions.${index}.correctAnswer`}
      render={({ field }) => (
        <InputField
          type="text"
          label="Answer"
          placeholder="Correct Answer"
          disabled={loading}
          {...field}
        />
      )}
    />
  );
};

export default TextAnswer;
