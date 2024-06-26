import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import useStateData from "@/hooks/useStateData";
import { ApiResponse } from "@/types/apiResponse";
import type { Classroom as ClassroomType } from "@/types/classroom";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, getRouteApi } from "@tanstack/react-router";
import { Copy, SquareChevronDown } from "lucide-react";
import { FC, useEffect } from "react";

const routeData = getRouteApi("/private/classroom/$classroomId");

const Classroom: FC = () => {
  const { classroomId } = routeData.useParams();
  const { user, userData, token } = useAuth();
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
    queryKey: [classroomId, user?.email, userData?._id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<ClassroomType>>(
        `/classroom/${classroomId}`,
        {
          params: { email: user?.email, userId: userData?._id },
          headers: { Authorization: token },
        },
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
      <div className="mb-4 flex items-center gap-2 border-b pb-4">
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
                  to="/classroom/$classroomId/create"
                  params={{ classroomId: classroomId }}
                >
                  Create new
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
            </DropdownMenu.content>
          </DropdownMenu>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Classroom;
