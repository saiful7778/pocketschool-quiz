import CreateClassroom from "@/components/CreateClassroom";
import JoinClassroom from "@/components/JoinClassroom";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse, Classroom } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import moment from "moment";

export const Route = createFileRoute("/_private/classroom/")({
  component: Classroom,
});

function Classroom(): JSX.Element {
  const { auth, user, token } = Route.useRouteContext();
  const axiosSecure = useAxiosSecure();

  const {
    data: classrooms,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classroom", auth?.email, user?.id, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<Classroom[]>>(
        "/classrooms/added",
        {
          params: { email: auth?.email, userId: user?.id },
          headers: { Authorization: token },
        },
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

  const renderClassrooms = classrooms?.map((classroom, idx) => {
    const published = moment(classroom.createdAt).format("DD/MM/YYYY HH:MM A");
    return (
      <div
        className="w-full max-w-xs rounded-md border p-4 shadow"
        key={`classroom-${idx}`}
      >
        <Link
          to={`/classroom/${classroom._id}`}
          className="text-xl font-semibold hover:underline"
        >
          {classroom.title}
        </Link>
        <div className="mt-4 text-xs text-muted-foreground">
          <div>
            <span className="mr-1 font-medium">Published:</span>
            <span>{published}</span>
          </div>
          <div>
            <span className="mr-1 font-medium">You are:</span>
            <span>
              {classroom.admin && "Admin"} {classroom.user && "User"}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 border-b pb-4">
        <h1 className="flex-1 text-xl font-semibold">Classrooms</h1>
        {user?.role !== "user" && (
          <CreateClassroom email={auth?.email} id={user?.id} token={token!} />
        )}
        <JoinClassroom email={auth?.email} id={user?.id} token={token!} />
      </div>
      <div className="flex flex-wrap gap-4">{renderClassrooms}</div>
    </div>
  );
}
