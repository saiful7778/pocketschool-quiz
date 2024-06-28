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
import { updateUserSchema } from "@/lib/schemas/userSchema";
import toast from "@/lib/toast/toast";
import type { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UpdateUserProps {
  id: string;
  role: User["role"];
  access: User["access"];
}

const UpdateUser: FC<UpdateUserProps> = ({ id, role, access }) => {
  const { token, user, userData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      access: access,
      role: role,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (updatedUserData: {
      role: User["role"];
      access: User["access"];
    }) => {
      return axiosSecure.patch(`/api/users/${id}`, updatedUserData, {
        params: { email: user?.email, userId: userData?._id },
        headers: { Authorization: token },
      });
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["users", userData?._id, user?.email, token],
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

  const handleSubmit = (e: z.infer<typeof updateUserSchema>) => {
    mutate({ access: e.access, role: e.role });
  };

  return userData?._id === id ? (
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
                    <Select.item value="superAdmin">super admin</Select.item>
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

export default UpdateUser;
