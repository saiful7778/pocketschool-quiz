import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "@/lib/toast/toast";
import { useAxiosSecure } from "@/hooks/useAxios";
import Dialog from "@/components/ui/dialog";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import Spinner from "@/components/Spinner";
import InputField from "@/components/InputField";
import type { Classroom } from "@/types/classroom";

interface CreateClassroomProps {
  email: string | undefined | null;
  id: string | undefined;
  token: string;
}

const CreateClassroom: FC<CreateClassroomProps> = ({ email, id, token }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createClassroomSchema>>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (classroomData: { title: Classroom["title"] }) => {
      return axiosSecure.post(
        "/classroom",
        { title: classroomData.title },
        {
          params: { email: email, userId: id },
          headers: { Authorization: token },
        },
      );
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["classroom", email, id, token],
        });
        form.reset();
        setOpenDialog(false);
        toast({
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.trigger asChild>
        <Button variant="outline" size="sm">
          Create new
          <span className="sr-only">create new classroom</span>
        </Button>
      </Dialog.trigger>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.header>
          <Dialog.title>Create new classroom</Dialog.title>
        </Dialog.header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Form.field
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
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? <Spinner size={20} /> : "Create"}
            </Button>
          </form>
        </Form>
      </Dialog.content>
    </Dialog>
  );
};

export default CreateClassroom;
