import Button from "@/components/ui/button";
import { Link, getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi("/private/classroom/$classroomId");

const Create: FC = () => {
  const { classroomId } = routeData.useParams();

  return (
    <>
      <h2 className="mb-4 border-b pb-2 font-semibold">Create new</h2>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" size="lg" asChild>
          <Link
            to="/classroom/$classroomId/create/quiz"
            params={{ classroomId }}
          >
            Quiz
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Create;
