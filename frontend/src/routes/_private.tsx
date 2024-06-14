import Sidebar from "@/components/shared/Sidebar";
import PrivateProtector from "@/protector/PrivateProtector";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  component: Private,
});

function Private(): JSX.Element {
  return (
    <PrivateProtector>
      <div className="flex flex-col gap-2 md:flex-row">
        <Sidebar />
        <div className="flex-1 p-2">
          <Outlet />
        </div>
      </div>
    </PrivateProtector>
  );
}
