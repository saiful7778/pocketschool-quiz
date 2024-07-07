import QuizUpdateForm from "@/components/forms/quiz/QuizUpdateForm";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { AdminQuiz } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/update_quiz/$quizId",
);

const UpdateQuiz: FC = () => {
  const { classroomId, quizId } = routeData.useParams();
  const navigate = routeData.useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: quizData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quiz", "admin", { classroomId, quizId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<AdminQuiz>>(
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

  return (
    <QuizUpdateForm
      classroomId={classroomId}
      quizId={quizId}
      defaultValues={quizData!}
      navigate={navigate}
    />
  );
};

export default UpdateQuiz;
