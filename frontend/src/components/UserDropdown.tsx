import { FC } from "react";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Button from "@/components/ui/button";
import Avatar from "@/components/ui/avatar";
import { User } from "firebase/auth";
import { Link } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";

interface UserAuthDropdownProps {
  user: User | undefined | null;
}

const UserDropdown: FC<UserAuthDropdownProps> = ({ user }) => {
  const { logOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenu.trigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <Avatar className="size-8 cursor-pointer">
            <Avatar.image asChild src={user!.photoURL!} alt="user avatar photo">
              <img
                src={user!.photoURL!}
                alt="user avatar photo"
                width={32}
                height={32}
              />
            </Avatar.image>
            <Avatar.fallback className="font-semibold uppercase">
              {user!.displayName![0] + user!.displayName![1]}
            </Avatar.fallback>
          </Avatar>
        </Button>
      </DropdownMenu.trigger>
      <DropdownMenu.content align="end" forceMount>
        <DropdownMenu.label className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenu.label>
        <DropdownMenu.separator />
        <DropdownMenu.item className="cursor-pointer" asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenu.item>
        <DropdownMenu.separator />
        <Button
          className="w-full"
          onClick={async () => await logOut()}
          variant="destructive"
          size="sm"
        >
          Logout
        </Button>
      </DropdownMenu.content>
    </DropdownMenu>
  );
};

export default UserDropdown;
