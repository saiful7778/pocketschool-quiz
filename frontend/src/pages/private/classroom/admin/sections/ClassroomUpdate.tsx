import ClassroomUpdateForm from "@/components/forms/classroom/ClassroomUpdateForm";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { Classroom } from "@/types/classroom";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface ClassroomUpdateProps {
  classroomId: string;
}

const ClassroomUpdate: FC<ClassroomUpdateProps> = ({ classroomId }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: classroom,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classroom", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Classroom>>(
        `/api/classrooms/${classroomId}`,
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
    <ClassroomUpdateForm title={classroom?.title!} classroomId={classroomId} />
  );
};

export default ClassroomUpdate;
