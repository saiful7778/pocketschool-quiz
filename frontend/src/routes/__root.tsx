import Navbar from "@/components/shared/Navbar";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { User } from "firebase/auth";
import type { User as UserData } from "@/types/user";

interface RouterContext {
  queryClient: QueryClient;
  token: string | null;
  auth: User | null;
  user: {
    _id: UserData["_id"];
    role: UserData["role"];
    uid: UserData["uid"];
  } | null;
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
