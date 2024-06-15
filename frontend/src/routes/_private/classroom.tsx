import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/classroom")({
  component: Classroom,
});

function Classroom(): JSX.Element {
  const routeContextData = Route.useRouteContext();

  return <div>Hello /_private/classroom!</div>;
}
