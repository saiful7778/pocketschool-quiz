import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import ClassroomUserTable from "@/components/tables/classroom/user/ClassroomUserTable";
import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponse } from "@/types/apiResponse";
import { Classroom } from "@/types/classroom";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface ClassroomUsersProps {
  classroomId: string;
}

const ClassroomUsers: FC<ClassroomUsersProps> = ({ classroomId }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: classroom,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classroom", "admin", "users", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Classroom>>(
        `/api/classrooms/${classroomId}/users`,
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
  });

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  return (
    <ClassroomUserTable
      classroomId={classroom?._id!}
      data={classroom?.users!}
      reFetch={refetch}
    />
  );
};

export default ClassroomUsers;
