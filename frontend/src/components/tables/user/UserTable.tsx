import { type FilterFn } from "@tanstack/react-table";
import columns from "./userColumn";
import type { User } from "@/types/user";
import MainTable from "../MainTable";

interface UserTableProps {
  data: User[];
  reFetch: () => void;
  isFetching: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ data, reFetch, isFetching }) => {
  const globalFilterFn: FilterFn<User> = (row, _columnId, filterValue) => {
    const user = row.original as User;
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
