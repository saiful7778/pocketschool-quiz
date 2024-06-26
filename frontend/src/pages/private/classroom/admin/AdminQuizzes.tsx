import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import QuizzesTable from "@/components/tables/classroom/quiz/QuizTable";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { Quizzes } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/quizzes",
);

const AdminQuizzes: FC = () => {
  const { classroomId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: quizzes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classroom", "admin", "quizzes", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Quizzes[]>>(
        `/quizzes/admin/${classroomId}`,
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
    <>
      <QuizzesTable
        data={quizzes!}
        classroomId={classroomId}
        reFetch={refetch}
      />
    </>
  );
};

export default AdminQuizzes;
