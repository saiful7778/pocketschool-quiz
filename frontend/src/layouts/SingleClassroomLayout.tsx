import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import useStateData from "@/hooks/useStateData";
import type { ApiResponse } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Copy, NotebookTabs, SquareChevronDown, Users } from "lucide-react";
import { FC, useEffect } from "react";

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

const routeData = getRouteApi("/private/classroom/$classroomId");

const SingleClassroomLayout: FC = () => {
  const { classroomId } = routeData.useParams();
  const { classroomRole, setClassroomRole, setClassroomDetailsLoading } =
    useStateData();
  const { userData } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: classroom,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
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

  useEffect(() => {
    if (classroom?.users) {
      setClassroomRole(classroom?.users.role);
      setClassroomDetailsLoading(false);
    }
  }, [classroom, setClassroomRole, setClassroomDetailsLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!classroom) {
    return <UndefinedData />;
  }

  return (
    <>
      <div className="flex items-center gap-2 border-b pb-4">
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
          <ClassroomManageMenu classroomId={classroomId} />
        )}
      </div>
      <Outlet />
    </>
  );
};

const ClassroomManageMenu = ({ classroomId }: { classroomId: string }) => {
  const navigate = useNavigate({ from: "/classroom/$classroomId" });

  return (
    <DropdownMenu>
      <DropdownMenu.trigger asChild>
        <Button size="icon" variant="outline">
          <SquareChevronDown size={20} />
        </Button>
      </DropdownMenu.trigger>
      <DropdownMenu.content align="end" forceMount>
        <DropdownMenu.label>Manage classroom</DropdownMenu.label>
        <DropdownMenu.separator />
        <DropdownMenu.item
          onClick={() =>
            navigate({
              to: "/classroom/$classroomId/users",
              params: { classroomId },
            })
          }
        >
          <Users size={16} strokeWidth={1} />
          <span>Users</span>
        </DropdownMenu.item>
        <DropdownMenu.item
          onClick={() =>
            navigate({
              to: "/classroom/$classroomId/details",
              params: { classroomId },
            })
          }
        >
          <NotebookTabs size={16} strokeWidth={1} />
          <span>Details</span>
        </DropdownMenu.item>
      </DropdownMenu.content>
    </DropdownMenu>
  );
};

export default SingleClassroomLayout;
