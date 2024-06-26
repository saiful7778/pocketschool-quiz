import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";
import DeleteQuiz from "./DeleteQuiz";
import { useNavigate } from "@tanstack/react-router";

interface QuizRowActionProps {
  classroomId: string;
  quizId: string;
  quizTitle: string;
}

const QuizRowAction: FC<QuizRowActionProps> = ({
  classroomId,
  quizId,
  quizTitle,
}) => {
  const navigate = useNavigate({ from: "/classroom/$classroomId/quizzes" });

  return (
    <DropdownMenu>
      <DropdownMenu.trigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal size={18} />{" "}
          <span className="sr-only">quiz manage menu</span>
        </Button>
      </DropdownMenu.trigger>
      <DropdownMenu.content align="end" forceMount>
        <DropdownMenu.label>Manage quiz</DropdownMenu.label>
        <DropdownMenu.separator />
        <DropdownMenu.item
          onClick={() =>
            navigate({
              to: "/classroom/$classroomId/update_quiz/$quizId",
              params: { classroomId, quizId },
            })
          }
        >
          Edit quiz
        </DropdownMenu.item>
        <DeleteQuiz
          quiztitle={quizTitle}
          quizId={quizId}
          classroomId={classroomId}
        />
      </DropdownMenu.content>
    </DropdownMenu>
  );
};

export default QuizRowAction;
