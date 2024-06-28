import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
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
import type { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UpdateUserProps {
  userId: string;
  classroomId: string;
  currentUserEmail: string;
  role: "user" | "admin";
  access: User["access"];
}

const UpdateClassroomUser: FC<UpdateUserProps> = ({
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
      const userUpdatedData: typeof data = { access: data.access };
      if (role !== data.role) {
        userUpdatedData.role = data.role;
      }
      return axiosSecure.patch(
        `/api/classrooms/${classroomId}/users/${userId}`,
        userUpdatedData,
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

  return currentUserEmail === user?.email ? (
    <div className="text-center text-xl font-semibold text-destructive">
      You can{`'`}t update your role or access
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
  );
};

export default UpdateClassroomUser;
