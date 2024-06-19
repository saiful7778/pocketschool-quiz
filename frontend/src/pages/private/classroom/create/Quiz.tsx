import Button from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import toast from "@/lib/toast/toast";
import type { Quiz } from "@/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi("/private/classroom/$classroomId/create/quiz");
const quizData = {
  title: "Sample Quiz",
  author: "666c634fc079719f0527fd72",
  startTime: "2024-06-20T15:00:00Z",
  questions: [
    {
      questionType: "multipleOptions",
      questionText: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswerIndex: 1,
      timeLimit: 30,
    },
    {
      questionType: "multipleAnswers",
      questionText: "Select all prime numbers.",
      options: ["2", "3", "4", "5"],
      correctAnswerIndices: [0, 1, 3],
      timeLimit: 45,
    },
    {
      questionType: "textAnswer",
      questionText: "How to print hello world in cpp?",
      correctAnswer: 'cout << "Hello world";',
      timeLimit: 60,
    },
    {
      questionType: "pinPointerAnswer",
      questionText: "Where is the blank space?",
      correctAnswer: { x: 50, y: 20 },
      timeLimit: 30,
    },
  ],
};

const Quiz: FC = () => {
  const { classroomId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();
  const { user, userData, token } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (quizData: Quiz) => {
      return axiosSecure.post(`/classroom/quiz/${classroomId}`, quizData, {
        params: { email: user?.email, userId: userData?._id },
        headers: { Authorization: token },
      });
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
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

  const handleCreate = () => {
    mutate(quizData);
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Create new quiz</h2>
      <Button onClick={handleCreate} disabled={isPending}>
        Create new quiz
      </Button>
    </>
  );
};

export default Quiz;
