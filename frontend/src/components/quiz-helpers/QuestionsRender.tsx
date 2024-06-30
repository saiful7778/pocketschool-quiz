import { FC } from "react";
import InputQuestions from "./InputQuestions";
import { useFieldArray } from "react-hook-form";
import type { QuizInput } from "@/types/quiz";
import QuestionInputBase from "./questionInput/QuestionInputBase";
import MultipleOption from "./questionInput/MultipleOption";
import MultipleAnswer from "./questionInput/MultipleAnswer";
import TextAnswer from "./questionInput/TextAnswer";
import PinPointAnswer from "./questionInput/PinPointAnswer";

const QuestionsRender: FC<QuizInput> = ({ control, loading }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <>
      {fields.map(({ questionType }, index) => (
        <QuestionInputBase
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
        </QuestionInputBase>
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

export default QuestionsRender;
