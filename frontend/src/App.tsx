import "@/assets/styles/global.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "@/routeTree.gen";
import Toaster from "@/components/ui/toaster";
import ErrorPage from "@/components/shared/Error";
import NotFound from "@/components/shared/NotFound";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading";

const router = createRouter({
  routeTree,
  context: {
    token: null,
    auth: null,
    user: null,
  },
  defaultPendingComponent: () => <Loading fullPage />,
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFound,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  const { token, user, userData } = useAuth();
  return (
    <>
      <RouterProvider
        router={router}
        context={{ token: `Bearer ${token}`, auth: user, user: userData }}
      />
      <Toaster />
    </>
  );
};

export default App;
