import type { AnswerQuiz } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import QuizAnswerRowAction from "./QuizAnswerRowAction";

export default function getQuizAnswerColumns(classroomId: string) {
  const columns: ColumnDef<AnswerQuiz>[] = [
    {
      id: "count",
      header: () => <div className="text-center">#NO</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      id: "quizTitle",
      header: () => <div className="min-w-40">Title</div>,
      cell: ({ row }) => {
        const title = row.original.quiz.title;
        return title;
      },
    },
    {
      id: "anwers",
      header: "Answers",
      cell: ({ row }) => {
        const totalAnswers = row.original.totalAnswers;
        const totalQuestions = row.original.quiz.totalQuestions;
        return (
          <div>
            {totalAnswers} of {totalQuestions}
          </div>
        );
      },
    },
    {
      id: "marks",
      header: "Marks",
      cell: ({ row }) => {
        const totalMarks = row.original.quiz.totalMarks;
        const answerMarks = row.original.totalMarks;
        return (
          <div>
            {answerMarks} of {totalMarks}
          </div>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const totalMarks = row.original.quiz.totalMarks;
        const answerMarks = row.original.totalMarks;

        const markPar = +((100 / totalMarks) * answerMarks).toFixed(0);

        return (
          <>
            <div>{markPar} %</div>
            <div className="w-fit rounded border px-2 py-0.5 text-xs">
              {markPar > 66 ? "good" : markPar > 40 ? "medium" : "bad"}
            </div>
          </>
        );
      },
    },
    {
      id: "time",
      accessorKey: "createdAt",
      header: "Time",
      cell: ({ getValue }) => {
        const createdAt = getValue<AnswerQuiz["createdAt"]>();
        const answerTime = moment(createdAt).format("DD/MM/YYYY hh:mm a");

        return <div className="text-xs">{answerTime}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const quizId = row.original.quiz._id;
        return (
          <QuizAnswerRowAction classroomId={classroomId} quizId={quizId} />
        );
      },
    },
  ];

  return columns;
}
