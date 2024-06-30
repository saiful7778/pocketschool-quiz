import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import type { ApiResponse } from "@/types/apiResponse";
import type { QuizPublic } from "@/types/quiz";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import StartQuiz from "@/components/quiz-helpers/StartQuiz";
import QuizContextProvider from "@/context/QuizContext";
import QuestionAnswerRender from "@/components/quiz-helpers/QuestionAnswerRender";

const routeData = getRouteApi("/private/classroom/$classroomId/$quizId");

const Quiz: FC = () => {
  const { quizId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: quiz,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quiz", { quizId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<QuizPublic>>(
        `/api/classrooms/quizzes/user/${quizId}`,
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
    <QuizContextProvider allQuestions={quiz?.questions!}>
      <div className="flex min-h-[60vh] items-center justify-center py-16">
        <StartQuiz startTime={quiz?.startTime!}>
          <QuestionAnswerRender />
        </StartQuiz>
      </div>
    </QuizContextProvider>
  );
};

export default Quiz;
