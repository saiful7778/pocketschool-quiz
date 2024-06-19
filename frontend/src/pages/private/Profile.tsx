import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import toast from "@/lib/toast/toast";
import { FC } from "react";

const Profile: FC = () => {
  const { forgetPassword, user, userData } = useAuth();

  const sendForgetPassword = async () => {
    try {
      await forgetPassword(user?.email!);
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

  const updateImage = async () => {
    toast({
      variant: "destructive",
      title: "This is currently unavailable",
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="card flex w-full max-w-xs flex-col items-center gap-4 rounded-md border p-4 shadow">
        <Avatar className="size-36 shadow">
          <Avatar.image asChild src={user?.photoURL!} alt="user avatar photo">
            <img src={user?.photoURL!} alt="user avatar photo" />
          </Avatar.image>
          <Avatar.fallback className="text-7xl font-semibold uppercase">
            {`${user?.displayName![0]}${user?.displayName![1]}`}
          </Avatar.fallback>
        </Avatar>
        <h3 className="text-2xl font-semibold">{user?.displayName}</h3>
        <Button onClick={updateImage}>Update image</Button>
      </div>
      <div className="card flex-1 rounded-md border p-4 shadow">
        <div className="divide-y divide-border">
          <div className="flex gap-4 p-2">
            <span className="w-full max-w-36">Full name</span>
            <span>:</span>
            <span className="flex-1">{user?.displayName}</span>
          </div>
          <div className="flex gap-4 p-2">
            <span className="w-full max-w-36">Email</span>
            <span>:</span>
            <span className="flex-1">{user?.email}</span>
          </div>
          <div className="flex gap-4 p-2">
            <span className="w-full max-w-36">Role</span>
            <span>:</span>
            <span className="flex-1">{userData?.role}</span>
          </div>
        </div>
        <Button onClick={sendForgetPassword} className="p-0" variant="link">
          forget password
        </Button>
      </div>
    </div>
  );
};

export default Profile;
