import Navbar from "@/components/shared/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: MainLayout,
});

function MainLayout(): JSX.Element {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <header className="container">
        <Navbar />
      </header>
      <main className="container">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
