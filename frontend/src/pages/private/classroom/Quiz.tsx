import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import type { ApiResponse } from "@/types/apiResponse";
import type { SubmitResult } from "@/types/question";
import type { QuizPublic } from "@/types/quiz";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import StartQuiz from "@/components/quiz-helpers/StartQuiz";
import QuizContextProvider from "@/context/QuizContext";
import QuestionAnswerRender from "@/components/quiz-helpers/QuestionAnswerRender";
import QuizResult from "./section/QuizResult";

const routeData = getRouteApi("/private/classroom/$classroomId/quiz/$quizId");

const Quiz: FC = () => {
  const { quizId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: quiz,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["quiz", { quizId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<
        ApiResponse<{
          participated: boolean;
          data: SubmitResult & QuizPublic;
        }>
      >(`/api/quizzes/user/${quizId}`);
      if (!data.success) {
        throw new Error(data.message);
      }
      return data?.data;
    },
  });

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (quiz?.participated) {
    return <QuizResult resultData={quiz.data} />;
  }

  return (
    <QuizContextProvider
      reFetchQuizData={refetch}
      allQuestions={quiz?.data?.questions!}
    >
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 overflow-hidden py-16">
        <StartQuiz startTime={quiz?.data?.startTime!}>
          <QuestionAnswerRender />
        </StartQuiz>
      </div>
    </QuizContextProvider>
  );
};

export default Quiz;
