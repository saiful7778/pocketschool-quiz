import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import ClassroomUserTable from "@/components/tables/classroom/ClassroomUserTable";
import Tabs from "@/components/ui/tabs";
import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponse } from "@/types/apiResponse";
import { Classroom } from "@/types/classroom";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/users",
);

const ClassroomUsers: FC = () => {
  const { classroomId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: classroom,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classroom", "admin", "users", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Classroom>>(
        `/classroom/${classroomId}/admin`,
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

  return (
    <Tabs defaultValue="users">
      <Tabs.list>
        <Tabs.trigger value="users">Users</Tabs.trigger>
        <Tabs.trigger value="admins">Admins</Tabs.trigger>
      </Tabs.list>
      <Tabs.content value="users">
        <ClassroomUserTable
          classroomId={classroom?._id!}
          data={classroom?.users!}
          reFetch={refetch}
          role="user"
        />
      </Tabs.content>
      <Tabs.content value="admins">
        <ClassroomUserTable
          classroomId={classroom?._id!}
          data={classroom?.admins!}
          reFetch={refetch}
          role="admin"
        />
      </Tabs.content>
    </Tabs>
  );
};

export default ClassroomUsers;
