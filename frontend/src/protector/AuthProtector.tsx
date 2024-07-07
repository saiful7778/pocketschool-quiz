import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { defaultLoginPage } from "@/lib/staticData";
import type { LayoutProps } from "@/types/types";
import { Navigate } from "@tanstack/react-router";
import { FC } from "react";

const AuthProtector: FC<Readonly<LayoutProps>> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  const isAuth = !!user;

  if (isAuth) {
    return <Navigate to={defaultLoginPage} />;
  }
  return children;
};

export default AuthProtector;
