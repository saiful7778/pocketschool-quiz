import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import Dialog from "@/components/ui/dialog";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { AdminQuizDetails } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface QuizDetailsProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  quizId: string;
  classroomId: string;
}

const QuizDetails: FC<QuizDetailsProps> = ({
  open,
  onOpenChange,
  quizId,
  classroomId,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: quiz,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quiz", "admin", { classroomId, quizId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<AdminQuizDetails>>(
        `/api/quizzes/admin/${quizId}`,
        { params: { classroomId } },
      );
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content className="w-full max-w-4xl">
        {isLoading || isFetching ? (
          <Loading />
        ) : isError ? (
          <ErrorPage error={error} reset={refetch} />
        ) : (
          <>
            <Dialog.header>
              <Dialog.title>{quiz?.title}</Dialog.title>
              <Dialog.description className="leading-none">
                <div className="font-semibold">{quiz?.author.fullName}</div>
                <div>{quiz?.author.email}</div>
              </Dialog.description>
            </Dialog.header>
            <div className="h-[500px] overflow-auto">
              <pre>
                <code>{JSON.stringify(quiz, null, 2)}</code>
              </pre>
            </div>
          </>
        )}
      </Dialog.content>
    </Dialog>
  );
};

export default QuizDetails;
