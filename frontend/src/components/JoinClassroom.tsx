import { FC, useState } from "react";
import Dialog from "./ui/dialog";
import { useAxiosSecure } from "@/hooks/useAxios";
import { joinClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "./ui/button";
import Form from "./ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "@/lib/toast/toast";
import InputField from "./InputField";
import Spinner from "./Spinner";
import type { Classroom } from "@/types/classroom";

interface JoinClassroomProps {
  email: string | undefined | null;
  id: string | undefined;
  token: string;
}

const JoinClassroom: FC<JoinClassroomProps> = ({ email, id, token }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof joinClassroomSchema>>({
    resolver: zodResolver(joinClassroomSchema),
    defaultValues: {
      _id: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (classroomData: { _id: Classroom["_id"] }) => {
      return axiosSecure.post(
        `/classroom/${classroomData._id}`,
        {},
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
          title: "You are joined",
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.trigger asChild>
        <Button size="sm">
          Join
          <span className="sr-only">join classroom</span>
        </Button>
      </Dialog.trigger>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.header>
          <Dialog.title>Join classroom</Dialog.title>
        </Dialog.header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Form.field
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
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? <Spinner size={20} /> : "Join"}
            </Button>
          </form>
        </Form>
      </Dialog.content>
    </Dialog>
  );
};

export default JoinClassroom;
