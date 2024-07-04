import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC } from "react";
import type { QuestionInput } from "@/types/question";
import Textarea from "@/components/ui/textarea";

interface TextAnswerProps extends QuestionInput {
  index: number;
}

const TextAnswer: FC<TextAnswerProps> = ({ control, index, loading }) => {
  return (
    <FormField
      control={control}
      name={`questions.${index}.correctAnswer`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Correct answer</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Correct Answer"
              // className="resize-none"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAnswer;
