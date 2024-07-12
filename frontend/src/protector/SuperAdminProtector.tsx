import useAuth from "@/hooks/useAuth";
import { defaultLoginPage } from "@/lib/staticData";
import type { LayoutProps } from "@/types";
import { Navigate } from "@tanstack/react-router";

const SuperAdminProtector: React.FC<Readonly<LayoutProps>> = ({ children }) => {
  const { userData } = useAuth();

  if (userData?.role !== "superAdmin") {
    return <Navigate to={defaultLoginPage} />;
  }
  return children;
};

export default SuperAdminProtector;
