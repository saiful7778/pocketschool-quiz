import { ReportType } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import ReportTableRowAction from "./ReportTableRowAction";
import { buttonVariants } from "@/lib/styles";
import { BadgePlus, Bug, CircleDot, TrendingUp } from "lucide-react";
import moment from "moment";
import { cn } from "@/lib/utils/shadcn";

const reportColumn: ColumnDef<ReportType>[] = [
  {
    id: "categoryIcon",
    cell: ({ row }) => {
      const category = row.original.category;

      return (
        <div className="flex items-center justify-center">
          {category === "issue" && <CircleDot size={25} strokeWidth={1} />}
          {category === "bug" && <Bug size={25} strokeWidth={1} />}
          {category === "improve" && <TrendingUp size={25} strokeWidth={1} />}
          {category === "feature" && <BadgePlus size={25} strokeWidth={1} />}
        </div>
      );
    },
  },
  {
    id: "title",
    accessorKey: "title",
    header: () => <div className="w-full min-w-52 max-w-56">Title</div>,
  },
  {
    id: "user",
    accessorKey: "user",
    cell: ({ getValue }) => {
      const user = getValue<ReportType["user"]>();
      return (
        <div className="text-xs text-muted-foreground">
          <div className="font-bold">{user.fullName}</div>
          <div>{user.email}</div>
        </div>
      );
    },
  },
  {
    id: "category",
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => {
      const category = getValue<ReportType["category"]>();
      return (
        <div className={buttonVariants({ size: "sm", variant: "outline" })}>
          {category === "issue" && <CircleDot size={16} strokeWidth={1} />}
          {category === "bug" && <Bug size={16} strokeWidth={1} />}
          {category === "improve" && <TrendingUp size={16} strokeWidth={1} />}
          {category === "feature" && <BadgePlus size={16} strokeWidth={1} />}
          <span className="ml-1">{category}</span>
        </div>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Create",
    cell: ({ getValue }) => {
      const createdAt = getValue<ReportType["createdAt"]>();
      const createTime = moment(createdAt).format("DD MMM YY - hh:mm a");

      return <div className="text-xs text-muted-foreground">{createTime}</div>;
    },
  },
  {
    id: "status",
    accessorKey: "response",
    header: "Status",
    cell: ({ getValue }) => {
      const response = getValue<ReportType["response"]>();

      return (
        <div>
          <div
            className={cn(
              "w-fit rounded-md border-2 px-2 py-0.5 text-sm text-white shadow",
              response?.close
                ? "border-red-400 bg-red-600"
                : "border-green-400 bg-green-600",
            )}
          >
            {response?.close ? "Close" : "Open"}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reportId = row.original._id;
      const message = row.original.message;
      const response = row.original?.response?.message;

      return (
        <ReportTableRowAction
          reportId={reportId}
          response={response}
          message={message}
        />
      );
    },
  },
];

export default reportColumn;
