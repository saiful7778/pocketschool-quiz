import { FC } from "react";
import Button from "../ui/button";
import {
  Grid2x2Check,
  ListChecks,
  MapPin,
  TextCursorInput,
} from "lucide-react";
import { UseFieldArrayAppend } from "react-hook-form";
import { z } from "zod";
import { quizSchema } from "@/lib/schemas/quizSchema";

interface InputQuestionsProps {
  append: UseFieldArrayAppend<z.infer<typeof quizSchema>, "questions">;
}

const InputQuestions: FC<InputQuestionsProps> = ({ append }) => {
  const handleMultipuleOptions = () => {
    append({
      questionType: "multipleOption",
      questionText: "",
      timeLimit: 30,
      marks: 30,
      options: [{ text: "" }, { text: "" }],
      correctAnswerIndex: 1,
    });
  };

  const handleAnswerOptions = () => {
    append({
      questionType: "multipleAnswers",
      questionText: "",
      timeLimit: 30,
      marks: 30,
      options: [{ text: "" }, { text: "" }],
      correctAnswerIndices: [1, 2],
    });
  };

  const handleTextAnswer = () => {
    append({
      questionType: "textAnswer",
      questionText: "",
      timeLimit: 30,
      marks: 30,
      correctAnswer: "",
    });
  };

  return (
    <>
      <div className="flex items-center gap-2 rounded-md border p-2">
        <Button
          size="icon"
          className="rounded-full"
          variant="outline"
          onClick={handleMultipuleOptions}
          type="button"
          title="Multipule option questions"
        >
          <Grid2x2Check size={15} />
        </Button>
        <Button
          size="icon"
          className="rounded-full"
          variant="outline"
          onClick={handleAnswerOptions}
          type="button"
          title="Multipule answer questions"
        >
          <ListChecks size={15} />
        </Button>
        <Button
          size="icon"
          className="rounded-full"
          variant="outline"
          onClick={handleTextAnswer}
          type="button"
          title="Text input questions"
        >
          <TextCursorInput size={15} />
        </Button>
        <Button
          size="icon"
          className="rounded-full"
          variant="outline"
          type="button"
          disabled
          title="Pin pointer questions"
        >
          <MapPin size={15} />
        </Button>
      </div>
    </>
  );
};

export default InputQuestions;
