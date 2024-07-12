import ClassroomAdminProtector from "@/protector/ClassroomAdminProtector";
import { Outlet } from "@tanstack/react-router";

const ClassroomAdminLayout: React.FC = () => {
  return (
    <ClassroomAdminProtector>
      <Outlet />
    </ClassroomAdminProtector>
  );
};

export default ClassroomAdminLayout;
