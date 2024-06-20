import { InputProps } from "@/types/quiz";
import { FC } from "react";
import { useFieldArray } from "react-hook-form";
import Button from "../ui/button";
import Form from "../ui/form";
import Input from "../ui/input";
import { X } from "lucide-react";
import Checkbox from "../ui/checkbox";

interface QuestionOptionsProps extends InputProps {
  index: number;
}

const AnswerIndices: FC<QuestionOptionsProps> = ({
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
      {fields.map((_, idx) => (
        <div
          key={`questions-${index}-options-${idx}`}
          className="relative flex w-fit items-center gap-2"
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
          <Form.field
            control={control}
            name={`questions.${index}.correctAnswerIndices`}
            render={({ field }) => (
              <>
                <Form.item>
                  <Form.control>
                    <Checkbox
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
                  </Form.control>
                  <Form.message />
                </Form.item>
              </>
            )}
          />
          <Form.field
            control={control}
            name={`questions.${index}.options.${idx}.text`}
            render={({ field }) => (
              <Form.item>
                <Form.control>
                  <Input
                    placeholder="option"
                    type="text"
                    disabled={loading}
                    {...field}
                  />
                </Form.control>
                <Form.message />
              </Form.item>
            )}
          />
        </div>
      ))}
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

export default AnswerIndices;
