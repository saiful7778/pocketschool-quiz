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
  loading: boolean;
}

const InputQuestions: FC<InputQuestionsProps> = ({ append, loading }) => {
  const handleMultipuleOptions = () => {
    append({
      questionType: "multipleOption",
      questionText: "",
      timeLimit: 15,
      marks: 10,
      options: [{ text: "" }, { text: "" }, { text: "" }],
      correctAnswerIndex: 1,
    });
  };

  const handleAnswerOptions = () => {
    append({
      questionType: "multipleAnswer",
      questionText: "",
      timeLimit: 15,
      marks: 20,
      options: [{ text: "" }, { text: "" }, { text: "" }],
      correctAnswerIndices: [0, 2],
    });
  };

  const handleTextAnswer = () => {
    append({
      questionType: "textAnswer",
      questionText: "",
      timeLimit: 30,
      marks: 50,
      correctAnswer: "",
    });
  };

  const handlePinPointAnswer = () => {
    append({
      questionType: "pinPointAnswer",
      questionText: "",
      timeLimit: 10,
      marks: 40,
      correctPinPointAnswer: {
        x: 0,
        y: 0,
      },
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
          type="button"
          title="Text input questions"
        >
          <TextCursorInput size={15} />
        </Button>
        <Button
          onClick={handlePinPointAnswer}
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
