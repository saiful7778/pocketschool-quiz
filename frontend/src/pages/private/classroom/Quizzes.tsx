import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import useStateData from "@/hooks/useStateData";
import type { ApiResponse } from "@/types/apiResponse";
import type { Quizzes as QuizzesType } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import moment from "moment";
import { FC } from "react";
import QuizDropdown from "@/components/quiz-helpers/QuizDropdown";

const routeData = getRouteApi("/private/classroom/$classroomId");

const Quizzes: FC = () => {
  const { classroomId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();
  const { classroomRole } = useStateData();

  const {
    data: quizzes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quizzes", classroomId, user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<QuizzesType[]>>(
        `/quizzes/${classroomId}`,
        {
          params: { email: user?.email, userId: userData?._id },
          headers: { Authorization: token },
        },
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

  const renderQuizzes = quizzes?.map((quiz, idx) => {
    const published = moment(quiz.createdAt).format("DD/MM/YYYY h:mm A");
    return (
      <div
        className="relative w-full max-w-52 rounded-md border p-4 shadow"
        key={`quiz-${idx}`}
      >
        {classroomRole === "admin" && (
          <div className="absolute right-2 top-2">
            <QuizDropdown classroomId={classroomId} quizId={quiz._id} />
          </div>
        )}
        <Link
          to="/classroom/$classroomId/quiz/$quizId"
          params={{ classroomId, quizId: quiz?._id }}
          className="font-semibold hover:underline"
        >
          {quiz.title}
        </Link>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div>{published}</div>
          <div>
            <span className="mr-1 font-medium">Questions:</span>
            <span>{quiz.questionsCount}</span>
          </div>
          <div>
            <span className="mr-1 font-medium">Created by:</span>
            <span>{quiz.author.fullName}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="mb-4 border-b pb-2">
        <h1 className="font-semibold">All Quizzes</h1>
      </div>
      <div className="flex flex-wrap gap-4">{renderQuizzes}</div>
    </>
  );
};

export default Quizzes;