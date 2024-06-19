import { Outlet } from "@tanstack/react-router";
import AuthContextProvider from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC } from "react";

const RootLayout: FC = () => {
  return (
    <AuthContextProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
        <header className="container">
          <Navbar />
        </header>
        <main className="container">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthContextProvider>
  );
};

export default RootLayout;
