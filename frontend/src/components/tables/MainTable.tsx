import {
  ColumnDef,
  FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Button from "../ui/button";
import Table from "../ui/table";
import Input from "../ui/input";
import Select from "../ui/select";
import { tableRowPerPage } from "@/lib/staticData";

interface MainTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  reFetch: () => void | undefined;
  notFoundText?: string | undefined;
  placeholder: string;
  globalFilterFn: FilterFnOption<TData>;
}

const MainTable = <TData,>({
  data,
  columns,
  reFetch,
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
      <div className="flex items-center gap-4">
        <Input
          placeholder={placeholder}
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={handleSearchChange}
          className="my-4 mr-auto w-full max-w-xs"
        />

        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <Select.trigger className="h-9 w-fit">
            <Select.value placeholder={table.getState().pagination.pageSize} />
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
          <Button onClick={reFetch} variant="default" size="md">
            Refrash
          </Button>
        )}
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
          <MdKeyboardDoubleArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <MdKeyboardArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <MdKeyboardArrowRight />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <MdKeyboardDoubleArrowRight />
        </Button>
      </div>
    </>
  );
};

export default MainTable;
