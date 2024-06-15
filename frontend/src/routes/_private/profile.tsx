import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import toast from "@/lib/toast/toast";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/profile")({
  component: Profile,
});

function Profile(): JSX.Element {
  const { forgetPassword } = useAuth();
  const { user, auth } = Route.useRouteContext();

  const sendForgetPassword = async () => {
    try {
      await forgetPassword(auth!.email!);
      toast({
        title: "Forget password mail sended",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: err.message,
        });
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="card flex w-full max-w-xs flex-col items-center gap-4 rounded-md border p-4 shadow">
        <Avatar className="size-36 shadow">
          <Avatar.image asChild src={auth!.photoURL!} alt="user avatar photo">
            <img src={auth!.photoURL!} alt="user avatar photo" />
          </Avatar.image>
          <Avatar.fallback className="text-7xl font-semibold uppercase">
            {auth!.displayName![0] + auth!.displayName![1]}
          </Avatar.fallback>
        </Avatar>
        <h3 className="text-2xl font-semibold">{auth?.displayName}</h3>
        <Button>Update image</Button>
      </div>
      <div className="card flex-1 rounded-md border p-4 shadow">
        <div className="divide-y divide-border">
          <div className="flex gap-4 p-2">
            <span className="w-full max-w-36">Full name</span>
            <span>:</span>
            <span className="flex-1">{auth?.displayName}</span>
          </div>
          <div className="flex gap-4 p-2">
            <span className="w-full max-w-36">Email</span>
            <span>:</span>
            <span className="flex-1">{auth?.email}</span>
          </div>
          <div className="flex gap-4 p-2">
            <span className="w-full max-w-36">Role</span>
            <span>:</span>
            <span className="flex-1">{user?.role}</span>
          </div>
        </div>
        <Button onClick={sendForgetPassword} className="p-0" variant="link">
          forget password
        </Button>
      </div>
    </div>
  );
}
