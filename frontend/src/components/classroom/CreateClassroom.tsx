import { FC } from "react";
import Dialog from "../ui/dialog";
import Button from "../ui/button";
import Spinner from "../Spinner";
import { Form, FormField } from "../ui/form";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxios";
import toast from "@/lib/toast/toast";

interface CreateClassroomProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const CreateClassroom: FC<CreateClassroomProps> = ({
  open,
  userId,
  onOpenChange,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createClassroomSchema>>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      title: "",
    },
  });

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
        form.reset();
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

  const handleSubmit = (e: z.infer<typeof createClassroomSchema>) => {
    mutate({ title: e.title });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.header>
          <Dialog.title>Create new classroom</Dialog.title>
        </Dialog.header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <InputField
                  type="text"
                  label="Title"
                  placeholder="Classroom title"
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
                {isPending ? <Spinner size={20} /> : "Create new classroom"}
              </Button>
            </Dialog.footer>
          </form>
        </Form>
      </Dialog.content>
    </Dialog>
  );
};

export default CreateClassroom;
