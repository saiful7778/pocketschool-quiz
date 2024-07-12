import Avatar from "@/components/ui/avatar";
import { QuizData } from "@/types/quiz";
import { ColumnDef } from "@tanstack/react-table";

export default function getQuizAnswerColumns() {
  const columns: ColumnDef<QuizData["participants"][number]>[] = [
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
              <div className="text-xs text-gray-400">{user.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return <div>Action</div>;
      },
    },
  ];

  return columns;
}
