import type { TextAnswer, TextAnswerAnswer } from "@/types";

interface TextAnswerQuestionItemProps {
  correctAnswer: TextAnswer["correctAnswer"];
  answer: TextAnswerAnswer["answer"];
}

const TextAnswerQuestionItem: React.FC<TextAnswerQuestionItemProps> = ({
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
