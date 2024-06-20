import type { InputProps } from "@/types/quiz";
import { FC } from "react";
import { useFieldArray } from "react-hook-form";
import Form from "../ui/form";
import Button from "../ui/button";
import Input from "../ui/input";
import { X } from "lucide-react";

interface QuestionOptionsProps extends InputProps {
  index: number;
}

const QuestionOptions: FC<QuestionOptionsProps> = ({
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
      <div className="flex flex-wrap items-start justify-center gap-2">
        {fields.map((_, idx) => (
          <Form.field
            control={control}
            key={`questions-${index}-options-${idx}`}
            name={`questions.${index}.options.${idx}.text`}
            render={({ field }) => (
              <Form.item>
                <Form.control>
                  <div className="relative w-full max-w-52">
                    <Input
                      placeholder="option"
                      type="text"
                      disabled={loading}
                      {...field}
                    />
                    <Button
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      size="icon"
                      variant="ghost"
                      type="button"
                      disabled={loading}
                      onClick={() => idx >= 2 && remove(idx)}
                    >
                      <X size={15} />
                    </Button>
                  </div>
                </Form.control>
                <Form.message />
              </Form.item>
            )}
          />
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={loading}
        onClick={() => fields.length < 5 && append({ text: "" })}
      >
        Add Option
      </Button>
    </>
  );
};

export default QuestionOptions;
