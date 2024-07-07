import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponse } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import type { AnswerQuizzesRes, NewQuizzesRes } from "@/types/quiz";
// import QuizItemRender from "@/components/quiz/QuizItemRender";
import QuizItem from "@/components/QuizItem";
import UserQuizAnswerTable from "@/components/tables/classroom/user-quiz/UserQuizAnswerTable";

const routeData = getRouteApi("/private/classroom/$classroomId/");

const ClassroomIndex: FC = () => {
  const { classroomId } = routeData.useParams();
  const navigate = routeData.useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: quizzes,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quizzes", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<
        ApiResponse<{
          newQuizzes: NewQuizzesRes[];
          answerQuizzes: AnswerQuizzesRes[];
        }>
      >(`/api/quizzes/user`, { params: { classroomId } });
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  return (
    <>
      {quizzes?.newQuizzes?.length! > 0 && (
        <>
          <h3 className="border-b pb-4 font-semibold">New quizzes</h3>
          <div className="flex flex-wrap gap-4">
            {quizzes?.newQuizzes.map((newQuiz, idx) => (
              <QuizItem
                key={`new-quiz-${idx}`}
                _id={newQuiz._id}
                classroomId={classroomId}
                navigate={navigate}
                totalQuestions={newQuiz.totalQuestions}
                title={newQuiz.title}
              />
            ))}
          </div>
        </>
      )}
      <h3 className="border-b pb-4 font-semibold">Quizzes result</h3>
      <UserQuizAnswerTable
        data={quizzes?.answerQuizzes!}
        classroomId={classroomId}
        reFetch={refetch}
      />
    </>
  );
};

export default ClassroomIndex;
