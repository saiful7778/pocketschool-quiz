import PrivateProtector from "@/protector/PrivateProtector";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  component: Private,
});

function Private(): JSX.Element {
  return (
    <PrivateProtector>
      <Outlet />
    </PrivateProtector>
  );
}