import Navbar from "@/components/shared/Navbar";
import { UserLoginResponse } from "@/types/apiResponse";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { User } from "firebase/auth";

interface RouterContext {
  queryClient: QueryClient;
  token: string | null;
  auth: User | null;
  user: UserLoginResponse["userData"] | null;
}

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
