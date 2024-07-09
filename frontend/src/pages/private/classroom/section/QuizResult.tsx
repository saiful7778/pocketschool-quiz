import QuestionItemRender from "@/components/quiz-question-helpers/question-item/QuestionItemRender";
import type { Result } from "@/types/question";
import { FC } from "react";

interface QuizResultProps {
  resultData: Result;
}

const QuizResult: FC<QuizResultProps> = ({ resultData }) => {
  console.log(resultData);
  return (
    <>
      <div>QuizResult</div>
      <QuestionItemRender answers={resultData.answers} />
    </>
  );
};

export default QuizResult;
