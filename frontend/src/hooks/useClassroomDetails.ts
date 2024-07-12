import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import type { ApiResponse } from "@/types";
import useAuth from "./useAuth";

interface Classroom {
  _id: string;
  title: string;
  users: {
    user: string;
    access: boolean;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default function useClassroomDetails(classroomId: string) {
  const { userData } = useAuth();
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["classroom", { classroomId, userId: userData?._id }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Classroom>>(
        `/api/classrooms/${classroomId}`,
      );
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    staleTime: Infinity,
  });
}
