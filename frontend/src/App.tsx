import "@/assets/styles/global.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "@/routeTree.gen";
import AuthContextProvider from "@/context/AuthContext";
import Toaster from "@/components/ui/toaster";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthContextProvider>
  );
};

export default App;
