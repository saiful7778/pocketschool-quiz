import Loading from "@/components/Loading";
import SelectClassroom from "@/components/SelectClassroom";
import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

interface Classrooms {
  _id: string;
  title: string;
}

const ClassroomsLayout: FC = () => {
  const { userData } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: classrooms,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["joined", { userId: userData?._id }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Classrooms[]>>(
        `/api/users/classrooms`,
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!classrooms) {
    return <UndefinedData />;
  }

  return (
    <div className="space-y-4">
      <SelectClassroom classrooms={classrooms!} />
      <Outlet />
    </div>
  );
};

export default ClassroomsLayout;
