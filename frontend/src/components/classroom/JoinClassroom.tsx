import { FC } from "react";
import Dialog from "../ui/dialog";
import { Form, FormField } from "../ui/form";
import InputField from "../InputField";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { joinClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "@/lib/toast/toast";
import Button from "../ui/button";
import Spinner from "../Spinner";

interface JoinClassroomProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const JoinClassroom: FC<JoinClassroomProps> = ({
  open,
  onOpenChange,
  userId,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof joinClassroomSchema>>({
    resolver: zodResolver(joinClassroomSchema),
    defaultValues: {
      _id: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (classroomData: z.infer<typeof joinClassroomSchema>) => {
      return axiosSecure.post(
        `/api/classrooms/join_classroom/${classroomData._id}`,
      );
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["joined", { userId }],
        });
        form.reset();
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

  const handleSubmit = (e: z.infer<typeof joinClassroomSchema>) => {
    mutate({ _id: e._id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.header>
          <Dialog.title>Join classroom</Dialog.title>
        </Dialog.header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="_id"
              render={({ field }) => (
                <InputField
                  type="text"
                  label="Classroom id"
                  placeholder="Classroom id"
                  disabled={isPending}
                  {...field}
                />
              )}
            />
            <Dialog.footer className="gap-2">
              <Dialog.close asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Dialog.close>
              <Button type="submit">
                {isPending ? <Spinner size={20} /> : "Join classroom"}
              </Button>
            </Dialog.footer>
          </form>
        </Form>
      </Dialog.content>
    </Dialog>
  );
};

export default JoinClassroom;
