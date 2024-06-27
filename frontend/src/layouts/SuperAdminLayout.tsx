import SuperAdminProtector from "@/protector/SuperAdminProtector";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

const SuperAdminLayout: FC = () => {
  return (
    <SuperAdminProtector>
      <Outlet />
    </SuperAdminProtector>
  );
};

export default SuperAdminLayout;
