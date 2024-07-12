import QuizUpdateForm from "@/components/forms/quiz/QuizUpdateForm";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import useQuizData from "@/hooks/useQuizData";
import { getRouteApi } from "@tanstack/react-router";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/admin/quiz/update/$quizId",
);

const UpdateQuiz: React.FC = () => {
  const { classroomId, quizId } = routeData.useParams();
  const navigate = routeData.useNavigate();

  const {
    data: quizData,
    isLoading,
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

  if (!quizData) {
    return <UndefinedData />;
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
