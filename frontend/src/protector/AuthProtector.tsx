import useAuth from "@/hooks/useAuth";
import { defaultLoginPage } from "@/lib/staticData";
import { LayoutProps } from "@/types/layout";
import { Navigate } from "@tanstack/react-router";
import { FC } from "react";

const AuthProtector: FC<Readonly<LayoutProps>> = ({ children }) => {
  const { user } = useAuth();

  const isAuth = !!user;

  if (!isAuth) {
    return children;
  }

  return <Navigate to={defaultLoginPage} />;
};

export default AuthProtector;
