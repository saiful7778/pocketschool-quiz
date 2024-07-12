import Avatar from "@/components/ui/avatar";
import type { Participant } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import QuizParticipantRowAction from "./QuizParticipantRowAction";

export default function getQuizAnswerColumns() {
  const columns: ColumnDef<Participant>[] = [
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
      id: "marks",
      header: () => <div className="text-center">Total Marks</div>,
      cell: ({ row }) => {
        const totalMarks = row.original.answer.totalMarks;
        return <div className="text-center">{totalMarks}</div>;
      },
    },
    {
      id: "answers",
      header: () => <div className="text-center">Total Answers</div>,
      cell: ({ row }) => {
        const totalAnswers = row.original.answer.totalAnswers;
        return <div className="text-center">{totalAnswers}</div>;
      },
    },
    {
      id: "submitted",
      header: () => <div className="text-center">Submitted</div>,
      cell: ({ row }) => {
        const submitted = row.original.answer.createdAt;
        const submittedTime = moment(submitted).format("DD MMM YY - hh:mm a");

        return <div className="text-center text-xs">{submittedTime}</div>;
      },
    },
    {
      id: "actions",
      cell: () => {
        return <QuizParticipantRowAction />;
      },
    },
  ];

  return columns;
}
