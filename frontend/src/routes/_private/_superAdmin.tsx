import SuperAdminProtector from "@/protector/SuperAdminProtector";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/_superAdmin")({
  component: SuperAdmin,
});

function SuperAdmin(): JSX.Element {
  return (
    <SuperAdminProtector>
      <Outlet />
    </SuperAdminProtector>
  );
}
