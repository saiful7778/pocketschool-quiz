import QuizForm from "@/components/quiz-helpers/QuizForm";
import { useAxiosSecure } from "@/hooks/useAxios";
import { quizSchema } from "@/lib/schemas/quizSchema";
import toast from "@/lib/toast/toast";
import type { ApiResponse, UpdateDateResponse } from "@/types/apiResponse";
import type { AdminQuiz } from "@/types/quiz";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseNavigateResult } from "@tanstack/react-router";
import type { FC } from "react";
import { z } from "zod";

interface QuizUpdateFormProps {
  classroomId: string;
  quizId: string;
  defaultValues: AdminQuiz;
  navigate: UseNavigateResult<"/classroom/$classroomId/update_quiz/$quizId">;
}

const QuizUpdateForm: FC<QuizUpdateFormProps> = ({
  classroomId,
  quizId,
  defaultValues,
  navigate,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update", { quizId, classroomId }],
    mutationFn: async (quizData: z.infer<typeof quizSchema>) => {
      return axiosSecure.patch<ApiResponse<UpdateDateResponse>>(
        `/api/quizzes/admin/${quizId}`,
        quizData,
        {
          params: { classroomId },
        },
      );
    },
    onSuccess: (data) => {
      if (data.data?.data?.modifiedCount! > 0) {
        queryClient.invalidateQueries({
          queryKey: ["classroom", "admin", "quizzes", { classroomId }],
        });
        navigate({
          to: "/classroom/$classroomId/quizzes",
          params: { classroomId },
        });
        toast({
          variant: "success",
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

  const dateTimeLocalNow = () => {
    return new Date(
      new Date(defaultValues.startTime).getTime() -
        new Date().getTimezoneOffset() * 60_000,
    )
      .toISOString()
      .slice(0, 16);
  };

  return (
    <QuizForm
      title={`Update '${defaultValues.title}' quiz`}
      submitButtonText="Update quiz"
      isPending={isPending}
      handleSubmit={(e) => mutate(e)}
      defaultValues={{ ...defaultValues, startTime: dateTimeLocalNow() }}
    />
  );
};

export default QuizUpdateForm;
