import { FC } from "react";
import InputQuestions from "./InputQuestions";
import { useFieldArray } from "react-hook-form";
import type { QuizInput } from "@/types/quiz";
import Question from "./Question";
import MultipleOption from "./questionTypes/MultipleOption";
import MultipleAnswer from "./questionTypes/MultipleAnswer";
import TextAnswer from "./questionTypes/TextAnswer";
import PinPointAnswer from "./questionTypes/PinPointAnswer";

const RenderQuestions: FC<QuizInput> = ({ control, loading }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <>
      {fields.map(({ questionType }, index) => (
        <Question
          key={`question-${index}`}
          control={control}
          loading={loading}
          index={index}
          removeQuestion={() => remove(index)}
          questionType={questionType}
        >
          <QuestionTypeOption
            control={control}
            loading={loading}
            index={index}
            questionType={questionType}
          />
        </Question>
      ))}
      <InputQuestions append={append} loading={loading} />
    </>
  );
};

interface QuestionTypeOptionProps extends QuizInput {
  index: number;
  questionType:
    | "multipleOption"
    | "multipleAnswer"
    | "textAnswer"
    | "pinPointAnswer";
}

const QuestionTypeOption: FC<QuestionTypeOptionProps> = ({
  control,
  loading,
  index,
  questionType,
}) => {
  if (questionType === "multipleOption") {
    return <MultipleOption control={control} loading={loading} index={index} />;
  }
  if (questionType === "multipleAnswer") {
    return <MultipleAnswer control={control} loading={loading} index={index} />;
  }
  if (questionType === "textAnswer") {
    return <TextAnswer control={control} loading={loading} index={index} />;
  }

  if (questionType === "pinPointAnswer") {
    return <PinPointAnswer />;
  }
};

export default RenderQuestions;
