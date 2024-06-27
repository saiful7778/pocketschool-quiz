import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, getRouteApi } from "@tanstack/react-router";
import type { Classroom } from "@/types/classroom";
import { FC, useEffect } from "react";
import useStateData from "@/hooks/useStateData";
import Button from "@/components/ui/button";
import { Copy, SquareChevronDown } from "lucide-react";
import DropdownMenu from "@/components/ui/dropdown-menu";

const routeData = getRouteApi("/private/classroom/$classroomId");

const SingleClassroom: FC = () => {
  const { classroomId } = routeData.useParams();
  const { classroomRole, setClassroomRole, setClassroomDetailsLoading } =
    useStateData();
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

  useEffect(() => {
    if (classroom?.role) {
      setClassroomRole(classroom?.role);
      setClassroomDetailsLoading(false);
    }
  }, [classroom, setClassroomRole, setClassroomDetailsLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  return (
    <>
      <div className="!mb-4 flex items-center gap-2 border-b pb-4">
        <Link
          className="text-2xl font-semibold hover:underline"
          to="/classroom/$classroomId"
          params={{ classroomId }}
        >
          {classroom?.title}
        </Link>
        <div className="flex-1">
          <Button
            onClick={() => navigator.clipboard.writeText(classroomId)}
            size="icon"
            variant="ghost"
            title="Click to copy classroom id"
          >
            <Copy size={15} />
          </Button>
        </div>
        {classroomRole === "admin" && (
          <DropdownMenu>
            <DropdownMenu.trigger asChild>
              <Button size="icon" variant="outline">
                <SquareChevronDown size={15} />
              </Button>
            </DropdownMenu.trigger>
            <DropdownMenu.content align="end" forceMount>
              <DropdownMenu.item asChild>
                <Link
                  to="/classroom/$classroomId/quizzes"
                  params={{ classroomId: classroomId }}
                >
                  All quizzes
                </Link>
              </DropdownMenu.item>
              <DropdownMenu.item asChild>
                <Link
                  to="/classroom/$classroomId/users"
                  params={{ classroomId: classroomId }}
                >
                  Users
                </Link>
              </DropdownMenu.item>
              <DropdownMenu.item asChild>
                <Link
                  to="/classroom/$classroomId/details"
                  params={{ classroomId: classroomId }}
                >
                  Details
                </Link>
              </DropdownMenu.item>
            </DropdownMenu.content>
          </DropdownMenu>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default SingleClassroom;
