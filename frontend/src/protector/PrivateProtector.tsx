import useAuth from "@/hooks/useAuth";
import type { LayoutProps } from "@/types/layout";
import { Navigate, useLocation } from "@tanstack/react-router";
import { FC } from "react";

const PrivateProtector: FC<Readonly<LayoutProps>> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuth = !!user;

  if (isAuth) {
    return children;
  }

  return <Navigate to="/login" search={{ redirect: location.href }} />;
};

export default PrivateProtector;
