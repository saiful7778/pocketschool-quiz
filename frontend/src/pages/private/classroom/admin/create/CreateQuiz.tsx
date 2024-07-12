import QuizForm from "@/components/forms/quiz/QuizForm";
import { useAxiosSecure } from "@/hooks/useAxios";
import { quizSchema } from "@/lib/schemas/quizSchema";
import toast from "@/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import { z } from "zod";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/admin/quiz/create",
);

const CreateQuiz: FC = () => {
  const { classroomId } = routeData.useParams();
  const navigate = routeData.useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (quizData: z.infer<typeof quizSchema>) => {
      return axiosSecure.post("/api/quizzes/admin", quizData, {
        params: { classroomId },
      });
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["admin", "quizzes", { classroomId }],
        });
        navigate({
          to: "/classroom/$classroomId",
          params: { classroomId },
        });
        toast({
          variant: "success",
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

  const handleSubmit = (e: z.infer<typeof quizSchema>) => {
    const quizData = {
      ...e,
      questions: e.questions.map((question, index) => ({ index, ...question })),
    };
    mutate(quizData);
  };

  return (
    <QuizForm
      title="Create new quiz"
      submitButtonText="Create quiz"
      isPending={isPending}
      handleSubmit={handleSubmit}
      defaultValues={{
        title: "Quiz title",
        startTime: dateTimeLocalNow(),
        questions: [
          {
            questionType: "multipleOption",
            title: "Simple question title",
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
            title: "Simple question",
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
