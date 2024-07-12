import { useFieldArray } from "react-hook-form";
import QuestionInputBase from "./QuestionInputBase";
import AddQuestion from "./AddQuestion";
import MultipleOption from "./MultipleOption";
import MultipleAnswer from "./MultipleAnswer";
import TextAnswer from "./TextAnswer";
import PinPointAnswer from "./PinPointAnswer";
import type { QuestionInputFieldProps, questionType } from "@/types";

const QuestionsInput: React.FC<QuestionInputFieldProps> = ({
  control,
  loading,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="space-y-4">
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
      <AddQuestion append={append} loading={loading} />
    </div>
  );
};

interface QuestionTypeOptionProps extends QuestionInputFieldProps {
  index: number;
  questionType: questionType;
}

const QuestionTypeOption: React.FC<QuestionTypeOptionProps> = ({
  control,
  loading,
  index,
  questionType,
}) => {
  return (
    <>
      {questionType === "multipleOption" && (
        <MultipleOption control={control} loading={loading} index={index} />
      )}
      {questionType === "multipleAnswer" && (
        <MultipleAnswer control={control} loading={loading} index={index} />
      )}
      {questionType === "textAnswer" && (
        <TextAnswer control={control} loading={loading} index={index} />
      )}
      {questionType === "pinPointAnswer" && <PinPointAnswer />}
    </>
  );
};

export default QuestionsInput;
