import { type FilterFn } from "@tanstack/react-table";
import type { AdminQuizzes } from "@/types";
import getAdminQuizColumn from "./adminQuizColumn";
import MainTable from "@/components/tables/MainTable";

interface QuizzesTableProps {
  data: AdminQuizzes[];
  classroomId: string;
  reFetch: () => void;
  isFetching: boolean;
}

const AdminQuizzesTable: React.FC<QuizzesTableProps> = ({
  data,
  classroomId,
  reFetch,
  isFetching,
}) => {
  const globalFilterFn: FilterFn<AdminQuizzes> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const quiz = row.original as AdminQuizzes;

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
