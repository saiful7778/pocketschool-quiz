import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import UserTable from "@/components/tables/user/UserTable";
import TableSkeleton from "@/components/TableSkeleton";
import { useAxiosSecure } from "@/hooks/useAxios";
import { USER_KEY } from "@/lib/queryKeys";
import type { ApiResponse, UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const Users: React.FC = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: USER_KEY,
    queryFn: async () => {
      const { data } =
        await axiosSecure.get<ApiResponse<UserType[]>>("/api/users");
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!users) {
    return <UndefinedData />;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">
        Total user: <span>{users?.length}</span>
      </h1>
      <UserTable data={users!} reFetch={refetch} isFetching={isFetching} />
    </div>
  );
};

export default Users;
