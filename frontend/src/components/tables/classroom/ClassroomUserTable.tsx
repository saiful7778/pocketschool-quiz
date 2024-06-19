import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Table from "@/components/ui/table";
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC } from "react";
import type { user } from "@/types/classroom";
import getColumns from "./column";

interface ClassroomUserTableProps {
  data: user[];
  reFetch: () => void;
  classroomId: string;
  role: "admin" | "user";
}

const ClassroomUserTable: FC<ClassroomUserTableProps> = ({
  data,
  reFetch,
  classroomId,
  role,
}) => {
  const globalFilterFn: FilterFn<user> = (row, _columnId, filterValue) => {
    const user = row.original as user;
    return (
      user.userId.fullName.toLowerCase().includes(filterValue.toLowerCase()) ||
      user.userId.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const columns = getColumns(classroomId, role);

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn as FilterFn<user>,
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

export default ClassroomUserTable;
