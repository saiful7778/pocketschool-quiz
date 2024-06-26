import {
  type FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { FC } from "react";
import type { Quizzes } from "@/types/quiz";
import getQuizColumns from "./quizColumn";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Table from "@/components/ui/table";
import { Link } from "@tanstack/react-router";

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

  const columns = getQuizColumns(classroomId);

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn as FilterFn<Quizzes>,
  });

  return (
    <>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Find quiz"
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value.toLowerCase())}
          className="mr-auto h-8 w-full max-w-xs"
        />
        <Button onClick={reFetch} variant="secondary" size="sm">
          Refrash
        </Button>
        <Button size="sm" asChild>
          <Link
            to="/classroom/$classroomId/create_quiz"
            params={{ classroomId }}
          >
            New Quiz
          </Link>
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
    </>
  );
};

export default QuizzesTable;
