import Loading from "@/components/Loading";
import SelectClassroom from "@/components/SelectClassroom";
import ErrorPage from "@/components/shared/Error";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

const ClassroomLayout: FC = () => {
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
      const { data } = await axiosSecure.get<
        ApiResponse<{ _id: string; title: string }[]>
      >(`/api/users/classrooms`);
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
    <>
      <SelectClassroom classrooms={classrooms!} />
      <Outlet />
    </>
  );
};

export default ClassroomLayout;
