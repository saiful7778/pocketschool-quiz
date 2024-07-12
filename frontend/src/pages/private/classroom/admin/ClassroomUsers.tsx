import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import ClassroomUserTable from "@/components/tables/classroom-user/ClassroomUserTable";
import TableSkeleton from "@/components/TableSkeleton";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse, ClassroomUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

const routeDate = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/users",
);

const ClassroomUsers: React.FC = () => {
  const { classroomId } = routeDate.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: classroomUsers,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classroom", "admin", "users", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<
        ApiResponse<{ _id: string; users: ClassroomUser[] }>
      >(`/api/classrooms/${classroomId}/users`);

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!classroomUsers) {
    return <UndefinedData />;
  }

  return (
    <ClassroomUserTable
      classroomId={classroomUsers?._id!}
      data={classroomUsers?.users!}
      reFetch={refetch}
      isFetching={isFetching}
    />
  );
};

export default ClassroomUsers;
