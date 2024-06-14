import Navbar from "@/components/shared/Navbar";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterContext {}

export const Route = createRootRouteWithContext<RouterContext>()({
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
