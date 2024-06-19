import Sidebar from "@/components/shared/Sidebar";
import PrivateProtector from "@/protector/PrivateProtector";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

const PrivateLayout: FC = () => {
  return (
    <PrivateProtector>
      <div className="flex flex-col gap-2 md:flex-row">
        <Sidebar />
        <div className="flex-1 p-2">
          <Outlet />
        </div>
      </div>
    </PrivateProtector>
  );
};

export default PrivateLayout;
