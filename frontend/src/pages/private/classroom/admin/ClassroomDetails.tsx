import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import ClassroomUpdate from "./sections/ClassroomUpdate";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/details",
);

const ClassroomDetails: FC = () => {
  const { classroomId } = routeData.useParams();

  return (
    <>
      <h3 className="border-b pb-4 font-semibold">Classroom details update</h3>
      <div className="w-full max-w-md">
        <ClassroomUpdate classroomId={classroomId} />
      </div>
    </>
  );
};

export default ClassroomDetails;
