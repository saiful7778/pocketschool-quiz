import useQuiz from "@/hooks/useQuiz";
import { FC, useState } from "react";
import type { questionType } from "@/types/question";
import MultipleOptionQuestionItem from "../question-item/MultipleOptionQuestionItem";

interface MultipleOptionQuestionAnswerProps {
  options: { _id: string; text: string }[];
  questionId: string;
  questionType: questionType;
}

const MultipleOptionQuestionAnswer: FC<MultipleOptionQuestionAnswerProps> = ({
  options,
  questionId,
  questionType,
}) => {
  const { handleSubmitAnswer, handleNextQuestion } = useQuiz();
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedOption, setCheckedOption] = useState<{
    _id: string;
    idx: number;
  }>({ _id: "", idx: 0 });

  const handleClick = (_id: string, idx: number) => {
    setChecked(true);
    setCheckedOption({ _id, idx });
    setTimeout(() => {
      handleSubmitAnswer(questionId, idx, questionType);
      handleNextQuestion();
    }, 500);
  };

  return (
    <MultipleOptionQuestionItem
      options={options}
      checked={checked}
      checkedOptionIdx={checkedOption.idx}
      loading={checked}
      optionClick={handleClick}
    />
  );
};

export default MultipleOptionQuestionAnswer;
