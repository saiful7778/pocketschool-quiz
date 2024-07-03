import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponse } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import type { QuizzesRes } from "@/types/quiz";
import QuizItemRender from "@/components/quiz/QuizItemRender";

const routeData = getRouteApi("/private/classroom/$classroomId/");

const ClassroomIndex: FC = () => {
  const { classroomId } = routeData.useParams();
  const navigate = routeData.useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: quizzes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quizzes", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<QuizzesRes[]>>(
        `/api/quizzes/user`,
        { params: { classroomId } },
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
    <QuizItemRender
      classroomId={classroomId}
      navigate={navigate}
      quizzesdata={quizzes!}
    />
  );
};

export default ClassroomIndex;
