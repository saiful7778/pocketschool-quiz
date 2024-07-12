import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PencilLine, ReceiptText, Trash2 } from "lucide-react";
import { FC, useState } from "react";
import DeleteQuiz from "./DeleteQuiz";
import { useNavigate } from "@tanstack/react-router";

interface QuizRowActionProps {
  classroomId: string;
  quizId: string;
  quizTitle: string;
}

const AdminQuizRowAction: FC<QuizRowActionProps> = ({
  classroomId,
  quizId,
  quizTitle,
}) => {
  const navigate = useNavigate({ from: "/classroom/$classroomId" });
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  return (
    <>
      <DeleteQuiz
        open={deleteConfirm}
        onOpenChange={setDeleteConfirm}
        quiztitle={quizTitle}
        quizId={quizId}
        classroomId={classroomId}
      />
      <DropdownMenu>
        <DropdownMenu.trigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal size={18} />
            <span className="sr-only">open quiz manage menu</span>
          </Button>
        </DropdownMenu.trigger>
        <DropdownMenu.content align="end" forceMount>
          <DropdownMenu.item
            onClick={() =>
              navigate({
                to: "/classroom/$classroomId/admin/quiz/$quizId",
                params: { classroomId, quizId },
              })
            }
          >
            <ReceiptText size={16} strokeWidth={1} /> <span>Details</span>
          </DropdownMenu.item>
          <DropdownMenu.separator />
          <DropdownMenu.item
            onClick={() =>
              navigate({
                to: "/classroom/$classroomId/admin/quiz/update/$quizId",
                params: { classroomId, quizId },
              })
            }
          >
            <PencilLine size={16} strokeWidth={1} /> <span>Update quiz</span>
          </DropdownMenu.item>
          <DropdownMenu.separator />
          <DropdownMenu.item
            onClick={() => setDeleteConfirm((prev) => !prev)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 size={16} strokeWidth={1} /> <span>Delete quiz</span>
          </DropdownMenu.item>
        </DropdownMenu.content>
      </DropdownMenu>
    </>
  );
};

export default AdminQuizRowAction;
