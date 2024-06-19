import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { user } from "@/types/classroom";
import UpdateClassroomUser from "./UpdateClassroomUser";

export default function getColumns(
  classroomId: string,
  role: "admin" | "user",
) {
  const columns: ColumnDef<user>[] = [
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
                src={user.userId?.image || undefined}
                alt={`${user.userId?.fullName} image`}
              >
                <img
                  src={user.userId?.image || undefined}
                  alt={`${user.userId?.fullName} image`}
                />
              </Avatar.image>
              <Avatar.fallback className="font-semibold">
                {user.userId?.fullName[0] + user.userId?.fullName[1]}
              </Avatar.fallback>
            </Avatar>
            <div>
              <div className="font-semibold leading-tight">
                {user.userId?.fullName}
              </div>
              <div className="text-xs text-gray-400">{user.userId?.email}</div>
            </div>
          </div>
        );
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
                <Dialog.title>Edit user</Dialog.title>
              </Dialog.header>
              <UpdateClassroomUser
                classroomId={classroomId}
                userId={user._id}
                currentUserEmail={user.userId.email}
                access={user.access}
                role={role}
              />
            </Dialog.content>
          </Dialog>
        );
      },
    },
  ];

  return columns;
}
