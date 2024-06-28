import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputField from "@/components/InputField";
import type { QuizInput } from "@/types/quiz";
import { useFieldArray } from "react-hook-form";
import RadioGroup from "@/components/ui/radio-group";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

interface MultipleOptionProps extends QuizInput {
  index: number;
}

const MultipleOption: FC<MultipleOptionProps> = ({
  control,
  loading,
  index,
}) => {
  return (
    <>
      <QuestionOptions index={index} control={control} loading={loading} />
      <FormField
        control={control}
        name={`questions.${index}.correctAnswerIndex`}
        render={({ field }) => (
          <InputField
            type="number"
            label="Answer index"
            placeholder="Answer index"
            disabled={loading}
            min={1}
            max={5}
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />
    </>
  );
};

const QuestionOptions: FC<MultipleOptionProps> = ({
  control,
  index,
  loading,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <>
      <div className="select-none text-sm font-medium">Question options</div>
      <RadioGroup className="grid grid-cols-1 gap-4 justify-self-center md:grid-cols-2">
        {fields.map((_, idx) => (
          <div
            className="relative flex items-center gap-1.5"
            key={`questions-${index}-options-${idx}`}
          >
            <RadioGroup.item
              value={`questions.${index}.options.${idx}.text`}
              id={`questions-${index}-options-${idx}`}
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
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
              size="icon"
              variant="ghost"
              type="button"
              disabled={loading}
              onClick={() => idx >= 2 && remove(idx)}
            >
              <X size={15} />
            </Button>
          </div>
        ))}
      </RadioGroup>
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

export default MultipleOption;
