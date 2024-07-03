import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import useQuiz from "@/hooks/useQuiz";
import { FC, useRef, useState } from "react";

interface TextAnswerQuestionAnswerProps {
  questionId: string;
  questionType:
    | "multipleOption"
    | "multipleAnswer"
    | "textAnswer"
    | "pinPointAnswer";
}

const TextAnswerQuestionAnswer: FC<TextAnswerQuestionAnswerProps> = ({
  questionId,
  questionType,
}) => {
  const { handleSubmitAnswer } = useQuiz();
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (inputRef.current) {
      if (inputRef.current.textLength > 0) {
        handleSubmitAnswer(questionId, inputRef.current.value, questionType);
      } else {
        setError("Type the answer");
      }
    }
  };

  return (
    <>
      <div>
        <Label>Write answer</Label>
        <Textarea
          ref={inputRef}
          placeholder="Write the wole Answer"
          className="mt-1 resize-none"
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Submit
      </Button>
      {error && (
        <p className="text-center text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </>
  );
};

export default TextAnswerQuestionAnswer;
