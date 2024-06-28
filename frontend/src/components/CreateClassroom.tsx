import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "@/lib/toast/toast";
import { useAxiosSecure } from "@/hooks/useAxios";
import Button from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import Spinner from "@/components/Spinner";
import InputField from "@/components/InputField";
import Drawer from "./ui/drawer";

interface CreateClassroomProps {
  trigger: ReactNode;
  id: string;
}

const CreateClassroom: FC<CreateClassroomProps> = ({ id, trigger }) => {
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
      return axiosSecure.post("/api/classrooms", {
        title: classroomData.title,
      });
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["joined", "classrooms", { userId: id }],
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
      <Drawer.trigger asChild>{trigger}</Drawer.trigger>
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
              <Drawer.footer>
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? <Spinner size={20} /> : "Create new classroom"}
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
