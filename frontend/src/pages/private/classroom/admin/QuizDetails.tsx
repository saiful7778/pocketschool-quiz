import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import QuizParticipantTable from "@/components/tables/quiz-participant/QuizParticipantTable";
import TableSkeleton from "@/components/TableSkeleton";
import useQuizData from "@/hooks/useQuizData";
import { getRouteApi } from "@tanstack/react-router";
import moment from "moment";

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
    return <TableSkeleton />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!quiz) {
    return <UndefinedData />;
  }

  const quizStartTime = moment(quiz.startTime).format("DD MMM YY - hh:mm a");

  return (
    <>
      <h2 className="text-2xl font-bold">{quiz.title}</h2>
      <div className="grid w-full max-w-md grid-cols-3 gap-2">
        <div className="font-semibold">Started</div>
        <div className="text-center">:</div>
        <div className="text-sm">{quizStartTime}</div>
        <div className="font-semibold">Total questions</div>
        <div className="text-center">:</div>
        <div>{quiz.totalQuestions}</div>
        <div className="font-semibold">Total mark</div>
        <div className="text-center">:</div>
        <div>{quiz.totalMarks}</div>
      </div>
      <QuizParticipantTable
        data={quiz.participants}
        isFetching={isFetching}
        reFetch={refetch}
      />
    </>
  );
};

export default QuizDetails;
