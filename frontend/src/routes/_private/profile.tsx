import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/profile")({
  component: Profile,
});

function Profile(): JSX.Element {
  return <div>Hello /_private/profile!</div>;
}
