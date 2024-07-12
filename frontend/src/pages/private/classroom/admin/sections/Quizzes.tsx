import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import AdminQuizzesTable from "@/components/tables/admin-quizzes/AdminQuizzesTable";
import TableSkeleton from "@/components/TableSkeleton";
import { useAxiosSecure } from "@/hooks/useAxios";
import { QUIZZES_KEY } from "@/lib/queryKeys";
import type { ApiResponse } from "@/types/apiResponse";
import type { Quizzes as QuizzesType } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface QuizzesProps {
  classroomId: string;
}

const Quizzes: FC<QuizzesProps> = ({ classroomId }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: quizzes,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: QUIZZES_KEY(classroomId),
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<QuizzesType[]>>(
        "/api/quizzes/admin",
        { params: { classroomId } },
      );
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

  if (!quizzes) {
    return <UndefinedData />;
  }

  return (
    <AdminQuizzesTable
      data={quizzes!}
      classroomId={classroomId}
      reFetch={refetch}
      isFetching={isFetching}
    />
  );
};

export default Quizzes;
