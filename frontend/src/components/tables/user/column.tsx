import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import type { UserData } from "@/types/apiResponse";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import UpdateUser from "./UpdateUser";

const columns: ColumnDef<UserData>[] = [
  {
    id: "count",
    header: () => <div className="text-center">#NO</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    id: "userDetails",
    header: "User Details",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <Avatar.image
              asChild
              src={user.image!}
              alt={`${user.fullName} image`}
            >
              <img src={user.image!} alt={`${user.fullName} image`} />
            </Avatar.image>
            <Avatar.fallback className="font-semibold">
              {user.fullName[0] + user.fullName[1]}
            </Avatar.fallback>
          </Avatar>
          <div>
            <div className="font-semibold leading-tight">{user.fullName}</div>
            <div className="text-xs text-gray-400">
              {user.email}
              {/* <span className="ml-1 text-sky-500">
                {user.isVerified ? "verified" : "not verified"}
              </span> */}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    id: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      return <div className="text-center">{role}</div>;
    },
  },
  {
    id: "access",
    accessorKey: "access",
    header: () => <div className="text-center">Access</div>,
    cell: ({ row }) => {
      const access = row.getValue("access");
      return access ? (
        <div className="text-center text-sky-500">true</div>
      ) : (
        <div className="text-center text-destructive">false</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Dialog>
          <Dialog.trigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={18} />
              <span className="sr-only">Open user manage menu</span>
            </Button>
          </Dialog.trigger>
          <Dialog.content className="w-full sm:max-w-md">
            <Dialog.header>
              <Dialog.title>Edit user profile</Dialog.title>
            </Dialog.header>
            <UpdateUser id={user._id} role={user.role} access={user.access} />
          </Dialog.content>
        </Dialog>
      );
    },
  },
];

export default columns;
