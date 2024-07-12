import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";

interface QuizAnswerRowActionProps {
  classroomId: string;
  quizId: string;
}

const QuizAnswerRowAction: React.FC<QuizAnswerRowActionProps> = ({
  classroomId,
  quizId,
}) => {
  const navigate = useNavigate({ from: "/classroom/$classroomId/" });
  return (
    <DropdownMenu>
      <DropdownMenu.trigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal size={18} />
          <span className="sr-only">open quiz manage menu</span>
        </Button>
      </DropdownMenu.trigger>
      <DropdownMenu.content align="end" forceMount>
        <DropdownMenu.label>Quiz answer</DropdownMenu.label>
        <DropdownMenu.separator />
        <DropdownMenu.item
          onClick={() =>
            navigate({
              to: "/classroom/$classroomId/quiz/$quizId",
              params: { classroomId, quizId },
            })
          }
        >
          Answer details
        </DropdownMenu.item>
      </DropdownMenu.content>
    </DropdownMenu>
  );
};

export default QuizAnswerRowAction;
