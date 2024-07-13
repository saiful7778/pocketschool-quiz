import React from "react";
import MainTable from "../MainTable";
import type { ReportType } from "@/types";
import type { FilterFn } from "@tanstack/react-table";
import reportColumn from "./reportTablecolumn";

interface ReportTableProps {
  data: ReportType[];
  reFetch: () => void;
  isFetching: boolean;
}

const ReportTable: React.FC<ReportTableProps> = ({
  data,
  reFetch,
  isFetching,
}) => {
  const globalFilterFn: FilterFn<ReportType> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const title = row.original.title;

    return title.toLowerCase().includes(filterValue);
  };

  return (
    <MainTable
      placeholder="Search report"
      notFoundText="No report find"
      isFetching={isFetching}
      globalFilterFn={globalFilterFn}
      columns={reportColumn}
      data={data}
      reFetch={reFetch}
    />
  );
};

export default ReportTable;
