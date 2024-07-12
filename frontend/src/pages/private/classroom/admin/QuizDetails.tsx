import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import QuizParticipantTable from "@/components/tables/quiz-participant/QuizParticipantTable";
import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponse } from "@/types/apiResponse";
import { QuizData } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/admin/quiz/$quizId",
);

const QuizDetails: FC = () => {
  const { classroomId, quizId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: quiz,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quiz", "admin", { classroomId, quizId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<QuizData>>(
        `/api/quizzes/admin/${quizId}`,
        { params: { classroomId } },
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

  if (!quiz) {
    return <UndefinedData />;
  }

  return (
    <>
      <h2 className="text-2xl font-bold">{quiz.title}</h2>
      <QuizParticipantTable
        data={quiz.participants}
        isFetching={isFetching}
        reFetch={refetch}
      />
    </>
  );
};

export default QuizDetails;
