import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import type { ContextProps } from "@/types/context";
import { Navigate, useLocation } from "@tanstack/react-router";
import { FC } from "react";

const PrivateProtector: FC<ContextProps> = ({ children }) => {
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
