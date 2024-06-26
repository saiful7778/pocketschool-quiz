import { type Quizzes } from "@/types/quiz";
import { type ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import QuizRowAction from "./QuizRowAction";

export default function getQuizColumns(classroomId: string) {
  const columns: ColumnDef<Quizzes>[] = [
    {
      id: "count",
      header: () => <div className="text-center">#NO</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      id: "quizTitle",
      accessorKey: "title",
      header: "Title",
    },
    {
      id: "questions",
      accessorKey: "questionsCount",
      header: "Questions",
    },
    {
      id: "author",
      accessorKey: "author",
      header: "Author",
      cell: ({ getValue }) => {
        const author = getValue<Quizzes["author"]>();
        return author?.email;
      },
    },
    {
      id: "startTime",
      accessorKey: "startTime",
      header: "Quiz will start",
      cell: ({ row }) => {
        const startTime = row.getValue<Quizzes["startTime"]>("startTime");
        const quizStartTime = moment(startTime).format("DD/MM/YYYY hh:mm a");
        return quizStartTime;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const quizId = row.original._id;
        const quizTitle = row.original.title;

        return (
          <QuizRowAction
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
