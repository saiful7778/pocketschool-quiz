import { type FilterFn } from "@tanstack/react-table";
import { FC } from "react";
import type { Quizzes } from "@/types/quiz";
import getQuizColumns from "./quizColumn";
import MainTable from "@/components/tables/MainTable";

interface QuizzesTableProps {
  data: Quizzes[];
  classroomId: string;
  reFetch: () => void;
}

const QuizzesTable: FC<QuizzesTableProps> = ({
  data,
  classroomId,
  reFetch,
}) => {
  const globalFilterFn: FilterFn<Quizzes> = (row, _columnId, filterValue) => {
    const quiz = row.original as Quizzes;

    return quiz.title.toLowerCase().includes(filterValue);
  };

  return (
    <MainTable
      data={data}
      notFoundText="No quiz found"
      columns={getQuizColumns(classroomId)}
      placeholder="Search quiz"
      globalFilterFn={globalFilterFn}
      reFetch={reFetch}
    />
  );
};

export default QuizzesTable;
