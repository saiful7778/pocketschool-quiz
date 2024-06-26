import Loading from "@/components/Loading";
import QuizForm from "@/components/quiz-helpers/QuizForm";
import ErrorPage from "@/components/shared/Error";
import { useAxiosSecure } from "@/hooks/useAxios";
import { quizSchema } from "@/lib/schemas/quizSchema";
import toast from "@/lib/toast/toast";
import type { ApiResponse } from "@/types/apiResponse";
import type { AdminQuiz } from "@/types/quiz";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import moment from "moment";
import { FC } from "react";
import { z } from "zod";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/update_quiz/$quizId",
);

const UpdateQuiz: FC = () => {
  const { classroomId, quizId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: quizData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quiz", "admin", { classroomId, quizId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<AdminQuiz>>(
        `/quiz/admin/${quizId}`,
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
    <UpdateQuizForm
      classroomId={classroomId}
      quizId={quizId}
      defaultValues={quizData!}
    />
  );
};

const UpdateQuizForm = ({
  classroomId,
  quizId,
  defaultValues,
}: {
  classroomId: string;
  quizId: string;
  defaultValues: AdminQuiz;
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = routeData.useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (quizData: z.infer<typeof quizSchema>) => {
      return axiosSecure.patch(`/quiz/${quizId}`, quizData);
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["classroom", "admin", "quizzes", { classroomId }],
        });
        navigate({
          to: "/classroom/$classroomId/quizzes",
          params: { classroomId },
        });
        toast({
          title: "Quiz is updated",
        });
      }
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: message,
      });
    },
  });

  console.log(defaultValues);

  const created = moment(defaultValues.createdAt).format("DD/MM/YYYY hh:mm a");
  const updated = moment(defaultValues.updatedAt).format("DD/MM/YYYY hh:mm a");

  return (
    <QuizForm
      title={`Update '${defaultValues.title}' quiz`}
      status={
        <div className="text-sm">
          <div>
            <span>Created at: </span> <span>{created}</span>
          </div>
          <div>
            <span>Updated at: </span> <span>{updated}</span>
          </div>
        </div>
      }
      submitButtonText="Update quiz"
      isPending={isPending}
      handleSubmit={(e) => mutate(e)}
      defaultValues={defaultValues}
    />
  );
};

export default UpdateQuiz;
