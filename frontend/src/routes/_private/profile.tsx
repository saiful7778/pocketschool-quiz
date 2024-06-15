import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import { useAxiosSecure } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/profile")({
  component: Profile,
});

function Profile(): JSX.Element {
  const axiosSecure = useAxiosSecure();
  const { token, user, auth } = Route.useRouteContext();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["profile", user?.id, user?.email, token],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.id}`, {
        params: { email: user?.email },
        headers: { Authorization: token },
      });
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
    <div className="flex flex-wrap justify-center gap-4">
      <div className="card flex w-full max-w-xs flex-col items-center gap-4 rounded-md border p-4 shadow">
        <Avatar className="size-36 shadow">
          <Avatar.image asChild src={auth!.photoURL!} alt="user avatar photo">
            <img src={auth!.photoURL!} alt="user avatar photo" />
          </Avatar.image>
          <Avatar.fallback className="font-semibold uppercase">
            {auth!.displayName![0] + auth!.displayName![1]}
          </Avatar.fallback>
        </Avatar>
        <h3 className="text-2xl font-semibold">{auth?.displayName}</h3>
        <Button>Update profile</Button>
      </div>
      <div className="card flex-1 divide-y divide-border rounded-md border p-4 shadow">
        <div className="flex gap-4 p-2">
          <span className="w-full max-w-36">Full name</span>
          <span>:</span>
          <span className="flex-1">{data.fullName}</span>
        </div>
        <div className="flex gap-4 p-2">
          <span className="w-full max-w-36">Email</span>
          <span>:</span>
          <span className="flex-1">{data.email}</span>
        </div>
        <div className="flex gap-4 p-2">
          <span className="w-full max-w-36">Role</span>
          <span>:</span>
          <span className="flex-1">{data.role}</span>
        </div>
      </div>
    </div>
  );
}
