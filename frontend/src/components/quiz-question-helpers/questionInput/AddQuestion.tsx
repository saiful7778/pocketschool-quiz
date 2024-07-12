import Button from "@/components/ui/button";
import type { quizSchema } from "@/lib/schemas/quizSchema";
import { Grid2x2Check, ListChecks, MapPin, PencilLine } from "lucide-react";
import { FC } from "react";
import type { UseFieldArrayAppend } from "react-hook-form";
import type { z } from "zod";

interface InputQuestionsProps {
  append: UseFieldArrayAppend<z.infer<typeof quizSchema>, "questions">;
  loading: boolean;
}

const AddQuestion: FC<InputQuestionsProps> = ({ append, loading }) => {
  const handleMultipuleOptions = () => {
    append({
      questionType: "multipleOption",
      title: "",
      timeLimit: 15,
      mark: 10,
      options: [{ text: "" }, { text: "" }, { text: "" }],
      correctAnswerIndex: 1,
    });
  };

  const handleAnswerOptions = () => {
    append({
      questionType: "multipleAnswer",
      title: "",
      timeLimit: 15,
      mark: 20,
      options: [{ text: "" }, { text: "" }, { text: "" }],
      correctAnswerIndices: [0, 2],
    });
  };

  const handleTextAnswer = () => {
    append({
      questionType: "textAnswer",
      title: "",
      timeLimit: 30,
      mark: 50,
      correctAnswer: "",
    });
  };

  const handlePinPointAnswer = () => {
    append({
      questionType: "pinPointAnswer",
      title: "",
      timeLimit: 10,
      mark: 40,
      correctPinPointAnswer: {
        x: 0,
        y: 0,
      },
    });
  };

  return (
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
        <Grid2x2Check size={18} />
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
        <ListChecks size={18} />
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
        <PencilLine size={18} />
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
        <MapPin size={18} />
      </Button>
    </div>
  );
};

export default AddQuestion;
