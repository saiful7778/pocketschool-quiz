import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "@/lib/toast/toast";
import { useAxiosSecure } from "@/hooks/useAxios";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import Spinner from "@/components/Spinner";
import InputField from "@/components/InputField";
import Drawer from "./ui/drawer";

interface CreateClassroomProps {
  email: string | undefined | null;
  id: string | undefined;
  token: string;
}

const CreateClassroom: FC<CreateClassroomProps> = ({ email, id, token }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
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
          queryKey: ["classrooms", email, id, token],
        });
        form.reset();
        setOpenDrawer(false);
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
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <Drawer.trigger asChild>
        <Button variant="outline" size="sm">
          Create new
          <span className="sr-only">create new classroom</span>
        </Button>
      </Drawer.trigger>
      <Drawer.content>
        <div className="mx-auto w-full max-w-sm">
          <Drawer.header>
            <Drawer.title>Create new classroom</Drawer.title>
          </Drawer.header>
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
              <Drawer.footer>
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? <Spinner size={20} /> : "Create"}
                </Button>
                <Drawer.close>
                  <Button type="button" className="w-full" variant="outline">
                    Cancel
                  </Button>
                </Drawer.close>
              </Drawer.footer>
            </form>
          </Form>
        </div>
      </Drawer.content>
    </Drawer>
  );
};

export default CreateClassroom;
