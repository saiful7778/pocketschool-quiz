import { FC } from "react";
import InputQuestions from "./InputQuestions";
import { useFieldArray } from "react-hook-form";
import Form from "../ui/form";
import InputField from "../InputField";
import Button from "../ui/button";
import { X } from "lucide-react";
import QuestionOptions from "./QuestionOptions";
import AnswerIndices from "./AnswerIndices";
import type { QuizInput } from "@/types/quiz";

const RenderQuestions: FC<QuizInput> = ({ control, loading }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const renderQuestionType = (
    value:
      | "multipleOption"
      | "multipleAnswers"
      | "textAnswer"
      | "pinPointerAnswer",
  ) => {
    switch (value) {
      case "multipleOption":
        return "Multiple options (Single Answer)";
      case "multipleAnswers":
        return "Multiple options (Multiple Answer)";
      case "textAnswer":
        return "Text input answer";
      case "pinPointerAnswer":
        return "Pin pointer answer";
    }
  };

  return (
    <>
      {fields.map((question, index) => (
        <div
          key={`question-${index}`}
          className="relative space-y-4 rounded-md border-t-2 border-primary p-4 shadow"
        >
          <div className="absolute right-2 top-2">
            <Button
              onClick={() => remove(index)}
              size="icon"
              disabled={loading}
              variant="ghost"
              type="button"
            >
              <X size={15} />
            </Button>
          </div>
          <div className="!mt-0 select-none font-semibold">
            {index + 1}. {renderQuestionType(question.questionType)}
          </div>
          <Form.field
            control={control}
            name={`questions.${index}.questionText`}
            render={({ field }) => (
              <InputField
                type="text"
                label="Question"
                placeholder="Question title"
                disabled={loading}
                {...field}
              />
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Form.field
              control={control}
              name={`questions.${index}.timeLimit`}
              render={({ field }) => (
                <InputField
                  type="number"
                  label="Answer time (s)"
                  placeholder="Time limit"
                  disabled={loading}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <Form.field
              control={control}
              name={`questions.${index}.marks`}
              render={({ field }) => (
                <InputField
                  type="number"
                  label="Marks"
                  placeholder="Question marks"
                  disabled={loading}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>
          {question.questionType === "multipleOption" && (
            <>
              <QuestionOptions
                index={index}
                control={control}
                loading={loading}
              />
              <Form.field
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
          )}
          {question.questionType === "multipleAnswers" && (
            <AnswerIndices index={index} control={control} loading={loading} />
          )}
          {question.questionType === "textAnswer" && (
            <Form.field
              control={control}
              name={`questions.${index}.correctAnswer`}
              render={({ field }) => (
                <InputField
                  type="text"
                  label="Answer"
                  placeholder="Correct Answer"
                  disabled={loading}
                  {...field}
                />
              )}
            />
          )}
          {question.questionType === "pinPointerAnswer" && (
            <Form.field
              control={control}
              name={`questions.${index}.correctAnswer`}
              render={({ field }) => (
                <InputField
                  type="text"
                  label="correctAnswer"
                  placeholder="correctAnswer"
                  disabled={loading}
                  {...field}
                />
              )}
            />
          )}
        </div>
      ))}
      <InputQuestions append={append} loading={loading} />
    </>
  );
};

export default RenderQuestions;
