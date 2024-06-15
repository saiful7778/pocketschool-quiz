import useAuth from "@/hooks/useAuth";
import type { ContextProps } from "@/types/context";
import { Navigate, useLocation } from "@tanstack/react-router";
import { FC } from "react";

const PrivateProtector: FC<ContextProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuth = !!user;

  if (!isAuth) {
    return <Navigate to="/login" search={{ redirect: location.href }} />;
  }
  return children;
};

export default PrivateProtector;
