import Loading from "@/components/Loading";
import QuizItem from "@/components/QuizItem";
import ErrorPage from "@/components/shared/Error";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/apiResponse";
import type { AnswerQuizzesRes, NewQuizzesRes } from "@/types/quiz";
import type { UseNavigateResult } from "@tanstack/react-router";
import UndefinedData from "@/components/shared/UndefinedData";
import UserQuizzesAnswerTable from "@/components/tables/user-quizzes/UserQuizzesAnswerTable";

interface UserClassroomMainProps {
  classroomId: string;
  userId: string;
  navigate: UseNavigateResult<"/classroom/$classroomId/">;
}

const UserClassroomMain: React.FC<UserClassroomMainProps> = ({
  classroomId,
  userId,
  navigate,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: quizzes,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quizzes", { classroomId, userId }],
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!quizzes) {
    return <UndefinedData />;
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
      <UserQuizzesAnswerTable
        data={quizzes?.answerQuizzes!}
        classroomId={classroomId}
        reFetch={refetch}
        isFetching={isFetching}
      />
    </>
  );
};

export default UserClassroomMain;
