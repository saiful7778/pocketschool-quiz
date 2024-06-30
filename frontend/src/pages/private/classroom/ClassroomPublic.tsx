import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponse } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { type UseNavigateResult, getRouteApi } from "@tanstack/react-router";
import quizImageTemplate from "@/assets/images/quiz-template.jpg";
import { FC } from "react";
import Button from "@/components/ui/button";

const routeData = getRouteApi("/private/classroom/$classroomId/");

const ClassroomPublic: FC = () => {
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
    queryKey: ["quizzes", "classrooms", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<
        ApiResponse<{ _id: string; title: string; questionsCount: number }[]>
      >(`/api/classrooms/quizzes/user`, { params: { classroomId } });
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
    <div className="flex flex-wrap gap-4">
      {quizzes?.map((quiz, idx) => (
        <Quiz
          key={`quiz-${idx}`}
          text={quiz.title}
          quizId={quiz._id}
          totalQuestion={quiz.questionsCount}
          classroomId={classroomId}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

const Quiz = ({
  text,
  quizId,
  classroomId,
  totalQuestion,
  navigate,
}: {
  text: string;
  quizId: string;
  totalQuestion: number;
  classroomId: string;
  navigate: UseNavigateResult<"/classroom/$classroomId/">;
}) => {
  return (
    <div className="w-[255px] rounded-md border p-4 shadow">
      <div className="relative mb-4 overflow-hidden rounded-md border">
        <img src={quizImageTemplate} alt="quiz image template" />
        <div className="absolute inset-0 left-1/2 top-1/2 z-[1] h-fit w-[100px] -translate-x-1/2 -translate-y-1/2 text-center">
          <span
            className="select-none font-bold italic leading-none"
            style={{
              fontSize: (96 / (text.length > 20 ? 20 : text.length)) * 3,
            }}
          >
            {text.length > 20 ? text.slice(0, 20) + "..." : text}
          </span>
        </div>
      </div>
      <h4 className="text-lg font-semibold leading-none">{text}</h4>
      <div className="my-2 grid grid-cols-2 justify-items-stretch text-sm text-muted-foreground">
        <div>Total questions:</div>
        <div className="text-right">{totalQuestion}</div>
      </div>
      <Button
        className="w-full"
        onClick={() =>
          navigate({
            to: "/classroom/$classroomId/$quizId",
            params: { classroomId, quizId },
          })
        }
      >
        Participate
      </Button>
    </div>
  );
};

export default ClassroomPublic;
