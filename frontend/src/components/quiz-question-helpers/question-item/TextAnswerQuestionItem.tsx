import { FC } from "react";

interface TextAnswerQuestionItemProps {
  correctAnswer: string;
  answer: string;
}

const TextAnswerQuestionItem: FC<TextAnswerQuestionItemProps> = ({
  correctAnswer,
  answer,
}) => {
  return (
    <>
      <div>
        <div className="text-sm italic text-muted-foreground">
          Correct answer
        </div>
        <div>{correctAnswer}</div>
      </div>
      <div>
        <div className="text-sm italic text-muted-foreground">Your answer</div>
        <div>{answer}</div>
      </div>
    </>
  );
};

export default TextAnswerQuestionItem;
