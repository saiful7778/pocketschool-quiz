import SuperAdminProtector from "@/protector/SuperAdminProtector";
import { Outlet } from "@tanstack/react-router";

const SuperAdminLayout: React.FC = () => {
  return (
    <SuperAdminProtector>
      <Outlet />
    </SuperAdminProtector>
  );
};

export default SuperAdminLayout;
