import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { Classroom } from "@/types/classroom";
import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { classroomUpdateSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import InputField from "@/components/InputField";
import Button from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import toast from "@/lib/toast/toast";
import useAuth from "@/hooks/useAuth";

const routeData = getRouteApi(
  "/private/classroom/$classroomId/classroomAdmin/details",
);

const ClassroomDetails: FC = () => {
  const { classroomId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: classroom,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classroom", { classroomId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Classroom>>(
        `/api/classrooms/${classroomId}`,
      );
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <ClassroomUpdateForm
        title={classroom?.title!}
        classroomId={classroomId}
      />
    </div>
  );
};

const ClassroomUpdateForm = ({
  title,
  classroomId,
}: {
  title: string;
  classroomId: string;
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { userData } = useAuth();

  const form = useForm<z.infer<typeof classroomUpdateSchema>>({
    resolver: zodResolver(classroomUpdateSchema),
    defaultValues: {
      title: title,
    },
  });

  const { mutate, isPending } = useMutation({
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
          queryKey: ["joined", "classrooms", { userId: userData?._id }],
        });
        toast({
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
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <Spinner size={20} /> : "Update classroom"}
        </Button>
      </form>
    </Form>
  );
};

export default ClassroomDetails;
