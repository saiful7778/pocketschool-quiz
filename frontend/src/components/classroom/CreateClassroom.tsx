import Dialog from "../ui/dialog";
import { z } from "zod";
import { createClassroomSchema } from "@/lib/schemas/classroomSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxios";
import toast from "@/lib/toast/toast";
import ClassroomCreateForm from "../forms/classroom/ClassroomCreateForm";

interface CreateClassroomProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const CreateClassroom: React.FC<CreateClassroomProps> = ({
  open,
  userId,
  onOpenChange,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      classroomData: z.infer<typeof createClassroomSchema>,
    ) => {
      return axiosSecure.post("/api/classrooms", {
        title: classroomData.title,
      });
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["joined", { userId }],
        });
        onOpenChange(false);
        toast({
          variant: "success",
          title: "Classroom is created",
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
          <Dialog.title>Create new classroom</Dialog.title>
        </Dialog.header>
        <ClassroomCreateForm
          handleSubmit={(e) => mutate({ title: e.title })}
          isPending={isPending}
        />
      </Dialog.content>
    </Dialog>
  );
};

export default CreateClassroom;
