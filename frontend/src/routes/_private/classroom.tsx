import Button from "@/components/ui/button";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { classroom } from "@/types/apiResponse";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/classroom")({
  component: Classroom,
});

function Classroom(): JSX.Element {
  const { user, auth, token } = Route.useRouteContext();
  const axiosSecure = useAxiosSecure();

  const { mutate } = useMutation({
    mutationFn: async (classroomData: classroom) => {
      return axiosSecure.post(
        "/classroom",
        { title: classroomData.title },
        {
          params: { email: auth?.email, userId: user?.id },
          headers: { Authorization: token },
        },
      );
    },
  });

  const createNewClassroom = () => {
    mutate({ title: "new classroom" });
  };

  return (
    <div>
      <Button onClick={createNewClassroom} size="sm">
        Create new classroom
      </Button>
    </div>
  );
}
