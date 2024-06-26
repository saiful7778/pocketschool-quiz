import CreateClassroom from "@/components/CreateClassroom";
import JoinClassroom from "@/components/JoinClassroom";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { ClassroomMainPage } from "@/types/classroom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import moment from "moment";
import { FC } from "react";

const Classrooms: FC = () => {
  const navigate = useNavigate();
  const { user, userData, token } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: classrooms,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classrooms", user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<ClassroomMainPage[]>>(
        "/classrooms/joined",
        {
          params: { email: user?.email, userId: userData?._id },
          headers: { Authorization: token },
        },
      );
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  const renderClassrooms = classrooms?.map((classroom, idx) => {
    const published = moment(classroom.createdAt).format("DD/MM/YYYY h:mm A");
    return (
      <div
        onClick={() => {
          navigate({
            to: "/classroom/$classroomId",
            params: { classroomId: classroom?._id },
          });
        }}
        className="group w-full max-w-64 rounded-md border p-4 shadow duration-200 hover:scale-105"
        key={`classroom-${idx}`}
        role="button"
      >
        <h6 className="text-xl font-semibold group-hover:underline">
          {classroom.title}
        </h6>
        <div className="mt-2 text-xs text-muted-foreground">
          <div>{published}</div>
          <div>
            <span className="font-semibold">You are: </span>
            <span>
              {classroom.admin && "Admin"} {classroom.user && "User"}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 border-b pb-4">
        <h1 className="flex-1 text-xl font-semibold">Classrooms</h1>
        {userData?.role !== "user" && (
          <CreateClassroom
            email={user?.email}
            id={userData?._id}
            token={token!}
          />
        )}
        <JoinClassroom email={user?.email} id={userData?._id} token={token!} />
      </div>
      <div className="flex flex-wrap gap-4">{renderClassrooms}</div>
    </div>
  );
};

export default Classrooms;
