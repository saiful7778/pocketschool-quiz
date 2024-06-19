import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UserTable from "@/components/tables/user/UserTable";
import useAuth from "@/hooks/useAuth";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse } from "@/types/apiResponse";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

const Users: FC = () => {
  const { user, userData, token } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", userData?._id, user?.email, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get<ApiResponse<User[]>>(
        "/users/all",
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
