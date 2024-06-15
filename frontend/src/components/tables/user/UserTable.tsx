import { FC } from "react";
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { UserData } from "@/types/apiResponse";
import columns from "./column";
import Input from "@/components/ui/input";
import Table from "@/components/ui/table";
import Button from "@/components/ui/button";

interface UserTableProps {
  data: UserData[];
  reFetch: () => void;
}

const UserTable: FC<UserTableProps> = ({ data, reFetch }) => {
  const globalFilterFn: FilterFn<UserData> = (row, _columnId, filterValue) => {
    const user = row.original as UserData;
    return (
      user.fullName.toLowerCase().includes(filterValue.toLowerCase()) ||
      user.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn as FilterFn<UserData>,
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Find user"
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="my-4 h-8 w-full max-w-xs"
        />
        <Button onClick={reFetch} variant="default" size="sm">
          Refrash
        </Button>
      </div>
      <Table>
        <Table.header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.head key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.head>
                );
              })}
            </Table.row>
          ))}
        </Table.header>
        <Table.body>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.row
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.cell>
                ))}
              </Table.row>
            ))
          ) : (
            <Table.row>
              <Table.cell colSpan={columns.length} className="h-24 text-center">
                No results.
              </Table.cell>
            </Table.row>
          )}
        </Table.body>
      </Table>
    </div>
  );
};

export default UserTable;
