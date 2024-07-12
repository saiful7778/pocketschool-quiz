import { Outlet } from "@tanstack/react-router";
import AuthContextProvider from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RouterDevTools from "@/components/RouterDevTools";
import Footer from "@/components/shared/Footer";

const RootLayout: React.FC = () => {
  return (
    <AuthContextProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
        <header className="container">
          <Navbar />
        </header>
        <main className="container">
          <Outlet />
        </main>
        <Footer />
      </div>
      {import.meta.env.MODE === "development" && <RouterDevTools />}
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthContextProvider>
  );
};

export default RootLayout;
