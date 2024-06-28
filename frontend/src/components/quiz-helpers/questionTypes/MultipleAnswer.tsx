import { FC } from "react";
import { useFieldArray } from "react-hook-form";
import type { QuizInput } from "@/types/quiz";
import Button from "@/components/ui/button";
import { X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";

interface MultipleAnswerProps extends QuizInput {
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
      <div className="select-none text-sm font-medium">Question options</div>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((_, idx) => (
          <div
            key={`questions-${index}-options-${idx}`}
            className="relative flex items-center gap-2"
          >
            <div className="absolute right-1 top-[11%]">
              <Button
                size="icon"
                variant="ghost"
                type="button"
                disabled={loading}
                onClick={() => idx >= 2 && remove(idx)}
              >
                <X size={15} />
              </Button>
            </div>
            <FormField
              control={control}
              name={`questions.${index}.correctAnswerIndices`}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        disabled={loading}
                        checked={field.value.includes(idx + 1)}
                        onCheckedChange={(checked) => {
                          const updatedIndices = checked
                            ? [...field.value, idx + 1]
                            : field.value.filter(
                                (valueIdx: number) => valueIdx !== idx + 1,
                              );
                          field.onChange(updatedIndices);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
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
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        disabled={loading}
        onClick={() => fields.length < 5 && append({ text: "" })}
      >
        Add Option
      </Button>
    </>
  );
};

export default MultipleAnswer;
