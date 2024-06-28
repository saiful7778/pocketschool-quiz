import { FC, ReactNode, useState } from "react";
import { useAxiosSecure } from "@/hooks/useAxios";
import { joinClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "./ui/button";
import { Form, FormField } from "./ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "@/lib/toast/toast";
import InputField from "./InputField";
import Spinner from "./Spinner";
import Drawer from "./ui/drawer";
import useAuth from "@/hooks/useAuth";

interface JoinClassroomProps {
  trigger: ReactNode;
}

const JoinClassroom: FC<JoinClassroomProps> = ({ trigger }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { userData } = useAuth();
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
          queryKey: ["joined", "classrooms", { userId: userData?._id }],
        });
        form.reset();
        setOpenDrawer(false);
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
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <Drawer.trigger asChild>{trigger}</Drawer.trigger>
      <Drawer.content>
        <div className="mx-auto w-full max-w-sm">
          <Drawer.header>
            <Drawer.title>Join new classroom</Drawer.title>
          </Drawer.header>
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
              <Drawer.footer>
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? <Spinner size={20} /> : "Join"}
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

export default JoinClassroom;
