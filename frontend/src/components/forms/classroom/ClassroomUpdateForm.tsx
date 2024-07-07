import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import { classroomUpdateSchema } from "@/lib/schemas/classroomSchema";
import toast from "@/lib/toast/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormField } from "@/components/ui/form";
import InputField from "@/components/InputField";
import Button from "@/components/ui/button";
import Spinner from "@/components/Spinner";

interface ClassroomUpdateFormProps {
  title: string;
  classroomId: string;
}

const ClassroomUpdateForm: FC<ClassroomUpdateFormProps> = ({
  title,
  classroomId,
}) => {
  const axiosSecure = useAxiosSecure();
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof classroomUpdateSchema>>({
    resolver: zodResolver(classroomUpdateSchema),
    defaultValues: {
      title: title,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update", { classroomId }],
    mutationFn: async (
      classroomData: z.infer<typeof classroomUpdateSchema>,
    ) => {
      return axiosSecure.patch(`/api/classrooms/${classroomId}`, classroomData);
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["classroom", { classroomId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["joined", { userId: userData?._id }],
        });
        toast({
          variant: "success",
          title: "Classroom is updated",
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

  const handleSubmit = (e: z.infer<typeof classroomUpdateSchema>) => {
    mutate(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <InputField
              type="text"
              label="Classroom Title"
              placeholder="Classroom Title"
              disabled={isPending}
              {...field}
            />
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner size={20} /> : "Update classroom"}
        </Button>
      </form>
    </Form>
  );
};

export default ClassroomUpdateForm;
