import Sidebar from "@/components/shared/Sidebar";
import PrivateProtector from "@/protector/PrivateProtector";
import { Outlet } from "@tanstack/react-router";

const PrivateLayout: React.FC = () => {
  return (
    <PrivateProtector>
      <div className="mb-4 flex flex-col gap-4 lg:flex-row">
        <Sidebar />
        <div className="flex-1 lg:border-l lg:pl-4">
          <Outlet />
        </div>
      </div>
    </PrivateProtector>
  );
};

export default PrivateLayout;
