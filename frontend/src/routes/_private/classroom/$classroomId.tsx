import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/classroom/$classroomId")({
  component: SingleClassroom,
});

function SingleClassroom(): JSX.Element {
  const { classroomId } = Route.useParams();
  console.log(classroomId);
  return <div></div>;
}
