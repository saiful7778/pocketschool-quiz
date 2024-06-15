import useAuth from "@/hooks/useAuth";
import { defaultLoginPage } from "@/lib/staticData";
import { ContextProps } from "@/types/context";
import { Navigate } from "@tanstack/react-router";
import { FC } from "react";

const AuthProtector: FC<ContextProps> = ({ children }) => {
  const { user } = useAuth();

  const isAuth = !!user;

  if (!isAuth) {
    return children;
  }

  return <Navigate to={defaultLoginPage} />;
};

export default AuthProtector;
