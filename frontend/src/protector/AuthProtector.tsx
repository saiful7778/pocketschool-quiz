import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { defaultLoginPage } from "@/lib/staticData";
import type { LayoutProps } from "@/types";
import { Navigate } from "@tanstack/react-router";

const AuthProtector: React.FC<Readonly<LayoutProps>> = ({ children }) => {
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
