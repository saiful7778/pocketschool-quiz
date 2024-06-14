import LoadingProtector from "@/protector/LoadingProtector";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  component: Private,
});

function Private(): JSX.Element {
  return (
    <LoadingProtector>
      <Outlet />
    </LoadingProtector>
  );
}
