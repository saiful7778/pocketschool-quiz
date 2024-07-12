import type { FilterFn } from "@tanstack/react-table";
import type { user } from "@/types/classroom";
import getColumns from "./classroomUserTableColumn";
import MainTable from "../MainTable";

interface ClassroomUserTableProps {
  data: user[];
  reFetch: () => void;
  classroomId: string;
  isFetching: boolean;
}

const ClassroomUserTable: React.FC<ClassroomUserTableProps> = ({
  data,
  reFetch,
  classroomId,
  isFetching,
}) => {
  const globalFilterFn: FilterFn<user> = (row, _columnId, filterValue) => {
    const user = row.original.user as user["user"];
    return (
      user.fullName.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue)
    );
  };

  return (
    <MainTable
      data={data}
      notFoundText="Classroom user not found"
      columns={getColumns(classroomId)}
      placeholder="Search classroom user"
      globalFilterFn={globalFilterFn}
      reFetch={reFetch}
      isFetching={isFetching}
    />
  );
};

export default ClassroomUserTable;
