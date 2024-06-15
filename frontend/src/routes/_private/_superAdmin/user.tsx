import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UserTable from "@/components/tables/user/UserTable";
import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponse, UserData } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/_superAdmin/user")({
  component: Users,
});

function Users(): JSX.Element {
  const axiosSecure = useAxiosSecure();
  const { token, user, auth } = Route.useRouteContext();

  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.id, auth?.email, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<UserData[]>>(
        "/users/all",
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

  return (
    <div>
      <h1 className="text-xl font-semibold">
        Total user: <span>{users?.length}</span>
      </h1>
      <UserTable data={users!} reFetch={refetch} />
    </div>
  );
}
