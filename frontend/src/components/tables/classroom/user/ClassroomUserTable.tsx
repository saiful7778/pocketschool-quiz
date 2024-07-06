import { type FilterFn } from "@tanstack/react-table";
import { FC } from "react";
import type { user } from "@/types/classroom";
import getColumns from "./classroomUserTableColumn";
import MainTable from "../../MainTable";

interface ClassroomUserTableProps {
  data: user[];
  reFetch: () => void;
  classroomId: string;
}

const ClassroomUserTable: FC<ClassroomUserTableProps> = ({
  data,
  reFetch,
  classroomId,
}) => {
  const globalFilterFn: FilterFn<user> = (row, _columnId, filterValue) => {
    const user = row.original as user;
    return (
      user.user.fullName.toLowerCase().includes(filterValue) ||
      user.user.email.toLowerCase().includes(filterValue)
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
    />
  );
};

export default ClassroomUserTable;
