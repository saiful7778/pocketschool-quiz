import Avatar from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import type { user } from "@/types/classroom";
import ClassroomUserRowAction from "./ClassroomUserRowAction";

export default function getColumns(classroomId: string) {
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
        const user = row.original.user;

        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <Avatar.image
                asChild
                src={user?.image!}
                alt={`${user?.fullName} image`}
              >
                <img src={user?.image!} alt={`${user?.fullName} image`} />
              </Avatar.image>
              <Avatar.fallback className="font-semibold">
                {user?.fullName[0] + user?.fullName[1]}
              </Avatar.fallback>
            </Avatar>
            <div>
              <div className="font-semibold leading-tight">
                {user?.fullName}
              </div>
              <div className="text-xs text-gray-400">{user?.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
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
            userId={user.user._id}
            role={user.role}
            email={user.user.email}
            access={user.access}
          />
        );
      },
    },
  ];

  return columns;
}
