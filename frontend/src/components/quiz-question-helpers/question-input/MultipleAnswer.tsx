import { useFieldArray, type UseFieldArrayRemove } from "react-hook-form";
import type { QuestionInputFieldProps } from "@/types";
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

interface MultipleAnswerProps extends QuestionInputFieldProps {
  index: number;
}

const MultipleAnswer: React.FC<MultipleAnswerProps> = ({
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
                  <Option
                    key={`questions-${index}-options-${idx}`}
                    control={control}
                    loading={loading}
                    fieldLength={fields.length}
                    onChange={field.onChange}
                    value={field.value}
                    optionIdx={idx}
                    questionIdx={index}
                    remove={remove}
                  />
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

interface OptionProps extends QuestionInputFieldProps {
  questionIdx: number;
  optionIdx: number;
  value: number[];
  onChange: (event: number[]) => void;
  remove: UseFieldArrayRemove;
  fieldLength: number;
}

const Option: React.FC<OptionProps> = ({
  control,
  loading,
  value,
  onChange,
  questionIdx,
  optionIdx,
  remove,
  fieldLength,
}) => {
  const handleChecked = (checked: boolean | "indeterminate") => {
    const updatedIndices = checked
      ? [...value, optionIdx]
      : value.filter((valueIdx: number) => valueIdx !== optionIdx);
    onChange(updatedIndices);
  };

  return (
    <div className="relative flex items-start gap-2">
      <Checkbox
        disabled={loading}
        className="mt-3"
        checked={value.includes(optionIdx)}
        onCheckedChange={handleChecked}
      />
      <FormField
        control={control}
        name={`questions.${questionIdx}.options.${optionIdx}.text`}
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
        disabled={loading || fieldLength < 3}
        onClick={() => optionIdx >= 2 && remove(optionIdx)}
      >
        <X size={15} />
      </Button>
    </div>
  );
};

export default MultipleAnswer;
