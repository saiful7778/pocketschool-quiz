import {
  ColumnDef,
  FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Button from "../ui/button";
import Table from "../ui/table";
import Input from "../ui/input";
import Select from "../ui/select";
import { tableRowPerPage } from "@/lib/staticData";
import Spinner from "../Spinner";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface MainTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  reFetch: () => void | undefined;
  isFetching: boolean;
  notFoundText?: string | undefined;
  placeholder: string;
  globalFilterFn: FilterFnOption<TData>;
}

const MainTable = <TData,>({
  data,
  columns,
  reFetch,
  isFetching,
  placeholder,
  notFoundText,
  globalFilterFn,
}: MainTableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Input
          placeholder={placeholder}
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={handleSearchChange}
          className="w-full max-w-xs"
        />
        <div className="flex gap-4">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <Select.trigger className="h-9 w-fit">
              <Select.value
                placeholder={table.getState().pagination.pageSize}
              />
            </Select.trigger>
            <Select.content side="left">
              {tableRowPerPage.map((pageSize) => (
                <Select.item key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </Select.item>
              ))}
            </Select.content>
          </Select>
          {typeof reFetch !== "undefined" && (
            <Button
              onClick={reFetch}
              className="w-full"
              variant="default"
              size="md"
            >
              {isFetching ? <Spinner size={20} /> : "Refrash"}
            </Button>
          )}
        </div>
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
                {notFoundText || "No results."}
              </Table.cell>
            </Table.row>
          )}
        </Table.body>
      </Table>
      <div className="mb-10 flex items-center justify-end gap-2 py-4 text-sm italic">
        <span>Page</span>
        <span>{table.getState().pagination.pageIndex + 1}</span>
        <span>of</span>
        <span>{table.getPageCount()}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft size={20} strokeWidth={1} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft size={20} strokeWidth={1} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronsRight size={20} strokeWidth={1} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronRight size={20} strokeWidth={1} />
        </Button>
      </div>
    </>
  );
};

export default MainTable;
