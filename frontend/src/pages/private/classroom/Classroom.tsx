import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import useAuth from "@/hooks/useAuth";
import useStateData from "@/hooks/useStateData";
import UserClassroomMain from "./section/UserClassroomMain";
import AdminClassroomMain from "./admin/AdminClassroomMain";

const routeData = getRouteApi("/private/classroom/$classroomId/");

const Classroom: FC = () => {
  const { classroomId } = routeData.useParams();
  const navigate = routeData.useNavigate();
  const { classroomRole } = useStateData();
  const { userData } = useAuth();

  return classroomRole === "user" ? (
    <UserClassroomMain
      classroomId={classroomId}
      userId={userData?._id!}
      navigate={navigate}
    />
  ) : (
    classroomRole === "admin" && <AdminClassroomMain />
  );
};

export default Classroom;
