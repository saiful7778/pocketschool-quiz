import type { ApiResponse, QuizData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";

export default function useQuizData(classroomId: string, quizId: string) {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["quiz", "admin", { classroomId, quizId }],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<QuizData>>(
        `/api/quizzes/admin/${quizId}`,
        { params: { classroomId } },
      );
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });
}
