import { type FilterFn } from "@tanstack/react-table";
import columns from "./userColumn";
import type { UserType } from "@/types";
import MainTable from "../MainTable";

interface UserTableProps {
  data: UserType[];
  reFetch: () => void;
  isFetching: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ data, reFetch, isFetching }) => {
  const globalFilterFn: FilterFn<UserType> = (row, _columnId, filterValue) => {
    const user = row.original as UserType;
    return (
      user.fullName.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue)
    );
  };

  return (
    <MainTable
      data={data}
      notFoundText="No user found"
      columns={columns}
      placeholder="Search user"
      globalFilterFn={globalFilterFn}
      reFetch={reFetch}
      isFetching={isFetching}
    />
  );
};

export default UserTable;
