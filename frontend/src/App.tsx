import "@/assets/styles/global.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { FC } from "react";
import Toaster from "@/components/ui/toaster";
import ErrorPage from "@/components/shared/Error";
import NotFound from "@/components/shared/NotFound";
import Loading from "@/components/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routeTree from "@/Routes";
import StateContextProvider from "@/context/StateContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10000,
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPendingComponent: () => <Loading fullPage />,
  defaultErrorComponent: ({ error, reset }) => (
    <ErrorPage error={error} reset={reset} fullPage />
  ),
  defaultNotFoundComponent: NotFound,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  return (
    <StateContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </StateContextProvider>
  );
};

export default App;
