import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import QuizParticipantTable from "@/components/tables/quiz-participant/QuizParticipantTable";
import useQuizData from "@/hooks/useQuizData";
import { getRouteApi } from "@tanstack/react-router";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/admin/quiz/$quizId",
);

const QuizDetails: React.FC = () => {
  const { classroomId, quizId } = routeData.useParams();

  const {
    data: quiz,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuizData(classroomId, quizId);

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
