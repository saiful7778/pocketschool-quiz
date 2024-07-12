import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { QuestionInput } from "@/types/question";
import { useFieldArray, type UseFieldArrayRemove } from "react-hook-form";
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
                  <Option
                    control={control}
                    questionIdx={index}
                    optionIdx={idx}
                    loading={loading}
                    remove={remove}
                    fieldLength={fields.length}
                  />
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

interface OptionProps extends QuestionInput {
  questionIdx: number;
  optionIdx: number;
  remove: UseFieldArrayRemove;
  fieldLength: number;
}

const Option: FC<OptionProps> = ({
  control,
  loading,
  questionIdx,
  optionIdx,
  remove,
  fieldLength,
}) => {
  return (
    <div
      className="relative flex items-start gap-2"
      key={`questions-${questionIdx}-options-${optionIdx}`}
    >
      <div className="mt-2.5">
        <RadioGroup.item
          value={`${optionIdx}`}
          id={`questions-${questionIdx}-options-${optionIdx}`}
        />
      </div>
      <FormField
        control={control}
        name={`questions.${questionIdx}.options.${optionIdx}.text`}
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
        disabled={loading || fieldLength < 3}
        onClick={() => optionIdx >= 2 && remove(optionIdx)}
      >
        <X size={15} />
      </Button>
    </div>
  );
};

export default MultipleOption;
