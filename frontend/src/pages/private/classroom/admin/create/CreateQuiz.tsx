import QuizForm from "@/components/quiz-helpers/QuizForm";
import { useAxiosSecure } from "@/hooks/useAxios";
import { quizSchema } from "@/lib/schemas/quizSchema";
import toast from "@/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import { z } from "zod";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/create_quiz",
);

const CreateQuiz: FC = () => {
  const { classroomId } = routeData.useParams();
  const navigate = routeData.useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (quizData: z.infer<typeof quizSchema>) => {
      return axiosSecure.post("/api/classrooms/quizzes/admin", quizData, {
        params: { classroomId },
      });
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
          title: "Quiz is created",
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
      new Date().getTime() - new Date().getTimezoneOffset() * 60_000,
    )
      .toISOString()
      .slice(0, 16);
  };

  return (
    <QuizForm
      title="Create new quiz"
      submitButtonText="Create quiz"
      isPending={isPending}
      handleSubmit={(e: z.infer<typeof quizSchema>) => mutate(e)}
      defaultValues={{
        title: "Quiz title",
        startTime: dateTimeLocalNow(),
        questions: [
          {
            questionType: "multipleOption",
            questionText: "Simple question title",
            timeLimit: 15,
            mark: 10,
            options: [
              { text: "option-NO-1" },
              { text: "option-NO-2" },
              { text: "option-NO-3" },
            ],
            correctAnswerIndex: 1,
          },
          {
            questionType: "multipleAnswer",
            questionText: "Simple question",
            timeLimit: 15,
            mark: 20,
            options: [
              { text: "option-No-1" },
              { text: "option-No-2" },
              { text: "option-No-3" },
            ],
            correctAnswerIndices: [0, 2],
          },
        ],
      }}
    />
  );
};

export default CreateQuiz;
