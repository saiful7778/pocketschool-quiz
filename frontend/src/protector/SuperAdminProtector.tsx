import useAuth from "@/hooks/useAuth";
import { defaultLoginPage } from "@/lib/staticData";
import type { LayoutProps } from "@/types/layout";
import { Navigate } from "@tanstack/react-router";
import { FC } from "react";

const SuperAdminProtector: FC<Readonly<LayoutProps>> = ({ children }) => {
  const { userData } = useAuth();

  if (userData?.role !== "superAdmin") {
    return <Navigate to={defaultLoginPage} />;
  }
  return children;
};

export default SuperAdminProtector;
