import Avatar from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import type { user } from "@/types/classroom";
import ClassroomUserRowAction from "./ClassroomUserRowAction";

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
                src={user.userId?.image!}
                alt={`${user.userId?.fullName} image`}
              >
                <img
                  src={user.userId?.image!}
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
          <ClassroomUserRowAction
            classroomId={classroomId}
            id={user.userId._id}
            role={role}
            email={user.userId.email}
            access={user.access}
          />
        );
      },
    },
  ];

  return columns;
}
