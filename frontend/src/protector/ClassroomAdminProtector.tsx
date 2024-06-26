import Loading from "@/components/Loading";
import useStateData from "@/hooks/useStateData";
import type { LayoutProps } from "@/types/layout";
import { Navigate } from "@tanstack/react-router";
import { FC } from "react";

const ClassroomAdminProtector: FC<Readonly<LayoutProps>> = ({ children }) => {
  const { classroomRole, classroomDetailsLoading } = useStateData();

  if (classroomDetailsLoading) {
    return <Loading />;
  }

  if (classroomRole === "admin") {
    return children;
  }

  return <Navigate to="/classroom" />;
};

export default ClassroomAdminProtector;
