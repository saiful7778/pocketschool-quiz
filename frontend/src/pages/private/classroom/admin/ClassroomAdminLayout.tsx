import ClassroomAdminProtector from "@/protector/ClassroomAdminProtector";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

const ClassroomAdminLayout: FC = () => {
  return (
    <ClassroomAdminProtector>
      <Outlet />
    </ClassroomAdminProtector>
  );
};

export default ClassroomAdminLayout;
