import { type FilterFn } from "@tanstack/react-table";
import { FC } from "react";
import type { Quizzes } from "@/types/quiz";
import getAdminQuizColumn from "./adminQuizColumn";
import MainTable from "@/components/tables/MainTable";

interface QuizzesTableProps {
  data: Quizzes[];
  classroomId: string;
  reFetch: () => void;
  isFetching: boolean;
}

const AdminQuizzesTable: FC<QuizzesTableProps> = ({
  data,
  classroomId,
  reFetch,
  isFetching,
}) => {
  const globalFilterFn: FilterFn<Quizzes> = (row, _columnId, filterValue) => {
    const quiz = row.original as Quizzes;

    return quiz.title.toLowerCase().includes(filterValue);
  };

  return (
    <MainTable
      data={data}
      notFoundText="No quiz found"
      columns={getAdminQuizColumn(classroomId)}
      placeholder="Search quiz"
      globalFilterFn={globalFilterFn}
      reFetch={reFetch}
      isFetching={isFetching}
    />
  );
};

export default AdminQuizzesTable;
