import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { useAxiosSecure } from "@/hooks/useAxios";
import toast from "@/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { FC } from "react";

interface UpdateQuizProps {
  quizId: string;
  classroomId: string;
  quiztitle: string;
}

const DeleteQuiz: FC<UpdateQuizProps> = ({
  quiztitle,
  quizId,
  classroomId,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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
    <Dialog>
      <Dialog.trigger asChild>
        <Button size="sm" className="w-full" variant="destructive">
          <Trash2 className="mr-2" size={16} />
          <span>Delete</span>
        </Button>
      </Dialog.trigger>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.title className="text-center text-2xl">
          Do you want to delete this?
        </Dialog.title>
        <Dialog.description className="text-center">
          {`'${quiztitle}' it will be delete by clicking the delete button`}
        </Dialog.description>
        <Dialog.description className="text-center">
          Click cancel button to cancel this process
        </Dialog.description>
        <Dialog.footer className="!justify-center">
          <Dialog.close asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </Dialog.close>
          <Button onClick={() => mutate()} variant="destructive" size="sm">
            {isPending ? <Spinner size={20} /> : "Yes, Delete!"}
          </Button>
        </Dialog.footer>
      </Dialog.content>
    </Dialog>
  );
};

export default DeleteQuiz;
