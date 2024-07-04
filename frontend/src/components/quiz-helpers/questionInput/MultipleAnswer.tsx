import { FC } from "react";
import { useFieldArray } from "react-hook-form";
import type { QuestionInput } from "@/types/question";
import Button from "@/components/ui/button";
import { X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";

interface MultipleAnswerProps extends QuestionInput {
  index: number;
}

const MultipleAnswer: FC<MultipleAnswerProps> = ({
  control,
  loading,
  index,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <>
      <FormField
        control={control}
        name={`questions.${index}.correctAnswerIndices`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question options</FormLabel>
            <FormControl>
              <div className="space-y-2">
                {fields.map((_, idx) => (
                  <div
                    key={`questions-${index}-options-${idx}`}
                    className="relative flex items-start gap-2"
                  >
                    <Checkbox
                      disabled={loading}
                      className="mt-3"
                      checked={field.value.includes(idx)}
                      onCheckedChange={(checked) => {
                        const updatedIndices = checked
                          ? [...field.value, idx]
                          : field.value.filter(
                              (valueIdx: number) => valueIdx !== idx,
                            );
                        field.onChange(updatedIndices);
                      }}
                    />
                    <FormField
                      control={control}
                      name={`questions.${index}.options.${idx}.text`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              placeholder="option"
                              type="text"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="absolute right-1.5 top-0.5"
                      size="icon"
                      variant="ghost"
                      type="button"
                      disabled={loading || fields.length < 3}
                      onClick={() => idx >= 2 && remove(idx)}
                    >
                      <X size={15} />
                    </Button>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        size="sm"
        disabled={loading || fields.length === 5}
        onClick={() => fields.length < 5 && append({ text: "" })}
      >
        Add Option
      </Button>
    </>
  );
};

export default MultipleAnswer;
