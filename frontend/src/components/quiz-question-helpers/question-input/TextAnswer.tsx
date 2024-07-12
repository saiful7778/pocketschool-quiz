import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { QuestionInputFieldProps } from "@/types";
import Textarea from "@/components/ui/textarea";

interface TextAnswerProps extends QuestionInputFieldProps {
  index: number;
}

const TextAnswer: React.FC<TextAnswerProps> = ({ control, index, loading }) => {
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
