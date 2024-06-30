import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UserTable from "@/components/tables/user/UserTable";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

const Users: FC = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<User[]>>("/api/users");
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
};

export default Users;
