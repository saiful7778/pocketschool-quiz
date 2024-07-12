import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import type { ApiResponse, QuizData, Result } from "@/types";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import StartQuiz from "@/components/quiz-helpers/StartQuiz";
import QuizContextProvider from "@/context/QuizContext";
import QuestionAnswer from "@/components/quiz-question-helpers/question-answer/QuestionAnswer";
import QuizResult from "./section/QuizResult";
import UndefinedData from "@/components/shared/UndefinedData";

const routeData = getRouteApi("/private/classroom/$classroomId/quiz/$quizId");

const Quiz: React.FC = () => {
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
          data: Result & {
            questions: QuizData["questions"];
            startTime: Date;
          };
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

  if (!quiz) {
    return <UndefinedData />;
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
          <QuestionAnswer />
        </StartQuiz>
      </div>
    </QuizContextProvider>
  );
};

export default Quiz;
