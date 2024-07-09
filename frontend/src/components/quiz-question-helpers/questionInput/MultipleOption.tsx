import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { QuestionInput } from "@/types/question";
import { useFieldArray } from "react-hook-form";
import RadioGroup from "@/components/ui/radio-group";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

interface MultipleOptionProps extends QuestionInput {
  index: number;
}

const MultipleOption: FC<MultipleOptionProps> = ({
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
        name={`questions.${index}.correctAnswerIndex`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question options</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(e) => field.onChange(Number(e))}
                defaultValue={String(field.value)}
              >
                {fields.map((_, idx) => (
                  <div
                    className="relative flex items-start gap-2"
                    key={`questions-${index}-options-${idx}`}
                  >
                    <div className="mt-2.5">
                      <RadioGroup.item
                        value={`${idx}`}
                        id={`questions-${index}-options-${idx}`}
                      />
                    </div>
                    <FormField
                      control={control}
                      name={`questions.${index}.options.${idx}.text`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              className="pr-10"
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
              </RadioGroup>
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

export default MultipleOption;
