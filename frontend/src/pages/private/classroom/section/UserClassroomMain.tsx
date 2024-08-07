import QuizItem from "@/components/QuizItem";
import ErrorPage from "@/components/shared/Error";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, NewQuiz, AnswerQuiz } from "@/types";
import type { UseNavigateResult } from "@tanstack/react-router";
import UndefinedData from "@/components/shared/UndefinedData";
import UserQuizzesAnswerTable from "@/components/tables/user-quizzes/UserQuizzesAnswerTable";
import TableSkeleton from "@/components/TableSkeleton";

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
          newQuizzes: NewQuiz[];
          answerQuizzes: AnswerQuiz[];
        }>
      >(`/api/quizzes/user`, { params: { classroomId } });
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });

  if (isLoading) {
    return <TableSkeleton />;
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
