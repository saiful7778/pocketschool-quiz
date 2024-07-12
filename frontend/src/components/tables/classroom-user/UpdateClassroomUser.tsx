import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/ui/select";
import Switch from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { updateClassroomUserSchema } from "@/lib/schemas/userSchema";
import toast from "@/lib/toast/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ElementOpenProps } from "@/types";

interface UpdateUserProps extends ElementOpenProps {
  userId: string;
  classroomId: string;
  currentUserEmail: string;
  role: "user" | "admin";
  access: boolean;
}

const UpdateClassroomUser: React.FC<UpdateUserProps> = ({
  open,
  onOpenChange,
  classroomId,
  userId,
  currentUserEmail,
  role,
  access,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof updateClassroomUserSchema>>({
    resolver: zodResolver(updateClassroomUserSchema),
    defaultValues: {
      access: access,
      role: role,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof updateClassroomUserSchema>) => {
      return axiosSecure.patch(
        `/api/classrooms/${classroomId}/users/${userId}`,
        data,
      );
    },
    onSuccess: (data) => {
      if (data?.status === 200 && data.data.data.matchedCount === 1) {
        queryClient.invalidateQueries({
          queryKey: ["classroom", "admin", "users", { classroomId }],
        });
        toast({
          title: "User is updated",
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

  const handleSubmit = (e: z.infer<typeof updateClassroomUserSchema>) => {
    mutate(e);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.header>
          <Dialog.title>Edit user</Dialog.title>
        </Dialog.header>
        {currentUserEmail === user?.email ? (
          <div className="text-center text-xl font-semibold text-destructive">
            You can{`'`}t update your role or access
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="access"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="w-36">Access</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="w-36">Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <Select.trigger>
                            <Select.value placeholder="Select user role" />
                          </Select.trigger>
                        </FormControl>
                        <Select.content>
                          <Select.item value="user">user</Select.item>
                          <Select.item value="admin">admin</Select.item>
                        </Select.content>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">
                  {isPending ? <Spinner /> : "Update user"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </Dialog.content>
    </Dialog>
  );
};

export default UpdateClassroomUser;
