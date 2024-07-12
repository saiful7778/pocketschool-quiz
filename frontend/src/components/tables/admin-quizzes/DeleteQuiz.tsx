import DeleteConfirm from "@/components/DeleteConfirm";
import { useAxiosSecure } from "@/hooks/useAxios";
import toast from "@/lib/toast/toast";
import type { ElementOpenProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateQuizProps extends ElementOpenProps {
  quizId: string;
  classroomId: string;
  quiztitle: string;
}

const DeleteQuiz: React.FC<UpdateQuizProps> = ({
  quiztitle,
  quizId,
  classroomId,
  open,
  onOpenChange,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["quizzes", "delete", "admin", { classroomId }],
    mutationFn: async () => {
      return axiosSecure.delete(`/api/quizzes/admin/${quizId}`, {
        params: { classroomId },
      });
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["quizzes", "admin", { classroomId }],
        });
        toast({
          variant: "success",
          title: "Quiz is deleted",
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

  return (
    <DeleteConfirm
      open={open}
      onOpenChange={onOpenChange}
      isConfirm={isPending}
      description={`'${quiztitle}' it will be delete by clicking the delete button`}
      confirmClick={() => mutate()}
    />
  );
};

export default DeleteQuiz;
