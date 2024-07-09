import { FC } from "react";
import InputQuestions from "./InputQuestions";
import { useFieldArray } from "react-hook-form";
import type { QuestionInput, questionType } from "@/types/question";
import QuestionInputBase from "../quiz-question-helpers/questionInput/QuestionInputBase";
import MultipleOption from "../quiz-question-helpers/questionInput/MultipleOption";
import MultipleAnswer from "../quiz-question-helpers/questionInput/MultipleAnswer";
import TextAnswer from "../quiz-question-helpers/questionInput/TextAnswer";
import PinPointAnswer from "../quiz-question-helpers/questionInput/PinPointAnswer";

const QuestionsRender: FC<QuestionInput> = ({ control, loading }) => {
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

interface QuestionTypeOptionProps extends QuestionInput {
  index: number;
  questionType: questionType;
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
