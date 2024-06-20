import InputField from "@/components/InputField";
import Spinner from "@/components/Spinner";
import RenderQuestions from "@/components/quiz-helpers/RenderQuestions";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import QuizFormContextProvider from "@/context/QuizFormContext";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { quizSchema } from "@/lib/schemas/quizSchema";
import toast from "@/lib/toast/toast";
import type { Quiz } from "@/types/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const routeData = getRouteApi("/private/classroom/$classroomId/create/quiz");

const Quiz: FC = () => {
  const { classroomId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "Quiz title",
      startTime: "",
      questions: [
        {
          questionType: "multipleOption",
          questionText: "Simple question title",
          timeLimit: 30,
          marks: 30,
          options: [{ text: "option-1" }, { text: "option-2" }],
          correctAnswerIndex: 1,
        },
        {
          questionType: "multipleAnswers",
          questionText: "Simple question",
          timeLimit: 30,
          marks: 30,
          options: [
            { text: "option-1" },
            { text: "option-2" },
            { text: "option-3" },
          ],
          correctAnswerIndices: [1, 2],
        },
      ],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (quizData: z.infer<typeof quizSchema>) => {
      return axiosSecure.post(`/classroom/quiz/${classroomId}`, quizData, {
        params: { email: user?.email, userId: userData?._id },
        headers: { Authorization: token },
      });
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        form.reset({});
        queryClient.invalidateQueries({
          queryKey: ["quizzes", classroomId, user?.email, userData?._id, token],
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

  const handleSubmit = async (e: z.infer<typeof quizSchema>) => {
    mutate(e);
    // navigator.clipboard.writeText(JSON.stringify(e));
  };

  return (
    <QuizFormContextProvider>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mx-auto w-full max-w-2xl space-y-4"
        >
          <h2 className="border-b pb-4 text-xl font-semibold">
            Create new quiz
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.field
              control={form.control}
              name="title"
              render={({ field }) => (
                <InputField
                  type="text"
                  label="Title"
                  placeholder="Quiz title"
                  disabled={isPending}
                  {...field}
                />
              )}
            />
            <Form.field
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <InputField
                  className="cursor-pointer"
                  type="datetime-local"
                  label="Start time"
                  disabled={isPending}
                  {...field}
                />
              )}
            />
          </div>
          <RenderQuestions control={form.control} loading={isPending} />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <Spinner size={20} /> : "Create new quiz"}
          </Button>
        </form>
      </Form>
    </QuizFormContextProvider>
  );
};

export default Quiz;
