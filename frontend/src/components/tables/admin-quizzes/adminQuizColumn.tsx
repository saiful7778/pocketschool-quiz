import type { AdminQuizzes } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import AdminQuizRowAction from "./AdminQuizRowAction";

export default function getAdminQuizColumn(classroomId: string) {
  const columns: ColumnDef<AdminQuizzes>[] = [
    {
      id: "count",
      header: () => <div className="text-center">#NO</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      id: "quizTitle",
      accessorKey: "title",
      header: () => <div className="w-full min-w-40 max-w-44">Title</div>,
    },
    {
      id: "questions",
      accessorKey: "totalQuestions",
      header: () => <div className="text-center">Questions</div>,
      cell: ({ getValue }) => {
        const totalQuestions = getValue<AdminQuizzes["totalQuestions"]>();
        return <div className="text-center">{totalQuestions}</div>;
      },
    },
    {
      id: "marks",
      accessorKey: "totalMarks",
      header: () => <div className="text-center">Total Marks</div>,
      cell: ({ getValue }) => {
        const totalMarks = getValue<AdminQuizzes["totalMarks"]>();
        return <div className="text-center">{totalMarks}</div>;
      },
    },
    {
      id: "participants",
      accessorKey: "participantCount",
      header: () => <div className="text-center">Participants</div>,
      cell: ({ getValue }) => {
        const participantCount = getValue<AdminQuizzes["participantCount"]>();
        return <div className="text-center">{participantCount}</div>;
      },
    },
    {
      id: "startTime",
      accessorKey: "startTime",
      header: () => <div className="min-w-20">Quiz will start</div>,
      cell: ({ getValue }) => {
        const startTime = getValue<AdminQuizzes["startTime"]>();
        const quizStartTime = moment(startTime).format("DD MMM YY - hh:mm a");

        return <div className="text-xs">{quizStartTime}</div>;
      },
    },
    {
      id: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        const updatedAt = row.original.updatedAt;

        const created = moment(createdAt).format("DD MMM YY - hh:mm a");
        const updated = moment(updatedAt).format("DD MMM YY - hh:mm a");

        return (
          <div className="whitespace-nowrap text-xs text-muted-foreground">
            <div>
              <span>Created :</span> <span>{created}</span>
            </div>
            <div>
              <span>updated :</span> <span>{updated}</span>
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const quizId = row.original._id;
        const quizTitle = row.original.title;

        return (
          <AdminQuizRowAction
            classroomId={classroomId}
            quizId={quizId}
            quizTitle={quizTitle}
          />
        );
      },
    },
  ];

  return columns;
}
