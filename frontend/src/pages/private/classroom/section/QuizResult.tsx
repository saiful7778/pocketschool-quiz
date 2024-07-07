import type { SubmitResult } from "@/types/question";
import { FC } from "react";

interface QuizResultProps {
  resultData: SubmitResult;
}

const QuizResult: FC<QuizResultProps> = ({ resultData }) => {
  return (
    <div>
      <div>QuizResult</div>
      <div>
        <div>Your result</div>
        <pre>
          <code>{JSON.stringify(resultData, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default QuizResult;
