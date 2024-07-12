import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import ClassroomUserTable from "@/components/tables/classroom-user/ClassroomUserTable";
import Skeleton from "@/components/ui/skeleton";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import { Classroom } from "@/types/classroom";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeDate = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/users",
);

const ClassroomUsers: FC = () => {
  const { classroomId } = routeDate.useParams();
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

  if (isLoading) {
    return (
      <>
        <div className="flex justify-between gap-4">
          <Skeleton className="mr-auto h-[36px] w-[295px]" />
          <Skeleton className="h-[36px] w-[42px]" />
          <Skeleton className="h-[36px] w-[62px]" />
        </div>
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
      </>
    );
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!classroom) {
    return <UndefinedData />;
  }

  return (
    <ClassroomUserTable
      classroomId={classroom?._id!}
      data={classroom?.users!}
      reFetch={refetch}
      isFetching={isFetching}
    />
  );
};

export default ClassroomUsers;
