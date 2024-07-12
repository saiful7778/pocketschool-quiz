import Dialog from "../ui/dialog";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { joinClassroomSchema } from "@/lib/schemas/classroomSchema";
import toast from "@/lib/toast/toast";
import ClassroomJoinForm from "../forms/classroom/ClassroomJoinForm";

interface JoinClassroomProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const JoinClassroom: React.FC<JoinClassroomProps> = ({
  open,
  onOpenChange,
  userId,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (classroomData: z.infer<typeof joinClassroomSchema>) => {
      return axiosSecure.post(`/api/users/join_classroom/${classroomData._id}`);
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["joined", { userId }],
        });
        onOpenChange(false);
        toast({
          variant: "success",
          title: "You are joined",
          description: "Wait for classroom admin approve",
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.header>
          <Dialog.title>Join classroom</Dialog.title>
        </Dialog.header>
        <ClassroomJoinForm
          handleSubmit={(e) => mutate({ _id: e._id })}
          isPending={isPending}
        />
      </Dialog.content>
    </Dialog>
  );
};

export default JoinClassroom;
