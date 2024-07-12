import CircleProgressBar from "@/components/CircleProgressBar";
import QuestionItemRender from "@/components/quiz-question-helpers/question-item/QuestionItemRender";
import type { Result } from "@/types/question";
import { FC, useMemo } from "react";

interface QuizResultProps {
  resultData: Result;
}

const QuizResult: FC<QuizResultProps> = ({ resultData }) => {
  const [result, questionMarks] = useMemo(() => {
    const totalQuestionMarks = resultData.answers.reduce(
      (sum, curr) => sum + curr.question.mark,
      0,
    );
    const percentage =
      ((100 / totalQuestionMarks) * resultData.totalMarks) / 100;

    return [percentage, totalQuestionMarks];
  }, [resultData]);

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div className="flex items-center justify-center">
        <CircleProgressBar percentage={result} size={200} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-primary p-4 text-center text-xl font-medium">
          <span>Total marks: {questionMarks}</span>
        </div>
        <div className="rounded-md border border-primary p-4 text-center text-xl font-medium">
          <span>Your marks: {resultData.totalMarks}</span>
        </div>
      </div>
      <QuestionItemRender answers={resultData.answers} />
    </div>
  );
};

export default QuizResult;
