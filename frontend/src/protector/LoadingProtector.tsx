import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { ContextProps } from "@/types/context";
import { FC } from "react";

const LoadingProtector: FC<ContextProps> = ({ children }) => {
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return children;
};

export default LoadingProtector;
