import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import type { LayoutProps } from "@/types";
import { Navigate, useLocation } from "@tanstack/react-router";

const PrivateProtector: React.FC<Readonly<LayoutProps>> = ({ children }) => {
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
