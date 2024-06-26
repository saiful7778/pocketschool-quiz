import CountDown from "@/components/CountDown";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import Button from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { Quiz } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi("/private/classroom/$classroomId/quiz/$quizId");

const SingleQuiz: FC = () => {
  const { classroomId, quizId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();

  const {
    data: quiz,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quiz", quizId, classroomId, user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Quiz>>(
        `/quiz/${quizId}`,
        {
          params: { email: user?.email, userId: userData?._id, classroomId },
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

  return (
    <div>
      <h3 className="text-xl font-semibold hover:underline">{quiz?.title}</h3>
      <CountDown time={quiz?.startTime!}>
        <Button>Start quiz</Button>
      </CountDown>
    </div>
  );
};

export default SingleQuiz;
