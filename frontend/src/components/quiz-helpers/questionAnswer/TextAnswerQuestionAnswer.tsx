import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import useQuiz from "@/hooks/useQuiz";
import { FC, useState } from "react";

interface TextAnswerQuestionAnswerProps {
  questionId: string;
}

const TextAnswerQuestionAnswer: FC<TextAnswerQuestionAnswerProps> = ({
  questionId,
}) => {
  const { handleNextQuestionIdx, handleResetTimer, handleSetQuestionAnswer } =
    useQuiz();
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const handleSubmit = () => {
    handleSetQuestionAnswer(questionId, correctAnswer);
    handleNextQuestionIdx();
    handleResetTimer();
  };

  return (
    <>
      <div className="text-center text-sm italic text-muted-foreground">
        Text input answer
      </div>
      <div>
        <Label>Write answer</Label>
        <Textarea
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Write the wole Answer"
          className="mt-1 resize-none"
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Submit
      </Button>
    </>
  );
};

export default TextAnswerQuestionAnswer;
