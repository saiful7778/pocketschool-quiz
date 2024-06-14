import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication")({
  component: Authentication,
});

function Authentication(): JSX.Element {
  return (
    <div className="flex min-h-[calc(100vh-90px)] w-full items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-md border p-4 shadow">
        <Outlet />
      </div>
    </div>
  );
}
