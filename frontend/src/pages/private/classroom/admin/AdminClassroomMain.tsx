import { FC } from "react";
import Quizzes from "./sections/Quizzes";
import { getRouteApi, Link } from "@tanstack/react-router";
import { MessageCircleCode } from "lucide-react";
import Button from "@/components/ui/button";

const routeData = getRouteApi("/private/classroom/$classroomId/");

const AdminClassroomMain: FC = () => {
  const { classroomId } = routeData.useParams();

  return (
    <>
      <h3 className="border-b pb-4 text-lg font-semibold">Create new</h3>
      <div className="flex w-[255px] flex-col items-center gap-4 rounded-md border p-4 text-center shadow">
        <MessageCircleCode size={80} strokeWidth={0.5} />
        <div className="italic text-muted-foreground">Create new quiz</div>
        <Button variant="secondary" size="sm" asChild>
          <Link
            to="/classroom/$classroomId/admin/quiz/create"
            params={{ classroomId }}
          >
            New quiz
          </Link>
        </Button>
      </div>
      <h3 className="border-b pb-4 text-lg font-semibold">All quizzes</h3>
      <Quizzes classroomId={classroomId} />
    </>
  );
};

export default AdminClassroomMain;
