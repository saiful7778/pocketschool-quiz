import InputField from "@/components/InputField";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Form from "@/components/ui/form";
import { useAxiosSecure } from "@/hooks/useAxios";
import { createClassroomSchema } from "@/lib/schemas/classroom";
import toast from "@/lib/toast/toast";
import type { classroom } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const Route = createFileRoute("/_private/classroom")({
  component: Classroom,
});

function Classroom(): JSX.Element {
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const { user, auth, token } = Route.useRouteContext();
  const axiosSecure = useAxiosSecure();

  const createClassroomForm = useForm<z.infer<typeof createClassroomSchema>>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate: createClassroom, isPending } = useMutation({
    mutationFn: async (classroomData: classroom) => {
      return axiosSecure.post(
        "/classroom",
        { title: classroomData.title },
        {
          params: { email: auth?.email, userId: user?.id },
          headers: { Authorization: token },
        },
      );
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        setCreateDialogOpen(false);
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

  const handleCreateClassroom = (e: z.infer<typeof createClassroomSchema>) => {
    createClassroom({ title: e.title });
  };

  return (
    <div>
      <div className="flex items-center gap-2 border-b pb-4">
        <h1 className="flex-1 text-xl font-semibold">Classrooms</h1>
        {user?.role !== "user" && (
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
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
              <Form {...createClassroomForm}>
                <form
                  onSubmit={createClassroomForm.handleSubmit(
                    handleCreateClassroom,
                  )}
                  className="space-y-4"
                >
                  <Form.field
                    control={createClassroomForm.control}
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
        )}
        <Button size="sm">Join</Button>
      </div>
    </div>
  );
}
