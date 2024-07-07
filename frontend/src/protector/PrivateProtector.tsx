import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import type { LayoutProps } from "@/types/types";
import { Navigate, useLocation } from "@tanstack/react-router";
import { FC } from "react";

const PrivateProtector: FC<Readonly<LayoutProps>> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  const isAuth = !!user;

  if (isAuth) {
    return children;
  }

  return <Navigate to="/login" search={{ redirect: location.href }} />;
};

export default PrivateProtector;
