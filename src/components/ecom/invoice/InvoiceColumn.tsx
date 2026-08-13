import type { ColumnDef, Column } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  creationDate: string;
  dueDate: string;
  total: number;
  status: "Paid" | "Unpaid" | "Draft";
}

/*  */
const SortableHeader = ({
  column,
  title,
}: {
  column: Column<Invoice, unknown>;
  title: string;
}) => {
  const sorted = column.getIsSorted();

  return (
    <button
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="flex items-center gap-1 text-sm font-medium text-[#9299B2] text-left"
    >
      {title}

      {sorted === "asc" ? (
        <ArrowUp size={14} />
      ) : sorted === "desc" ? (
        <ArrowDown size={14} />
      ) : (
        <ArrowUpDown size={14} className="text-gray-400" />
      )}
    </button>
  );
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const statusStyles: Record<Invoice["status"], string> = {
  Paid: "text-[#45B48F] font-medium",
  Unpaid: "text-[#E36D67] font-medium",
  Draft: "rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground",
};

export const invoiceColumns: ColumnDef<Invoice>[] = [
  /* Checkbox */
  {
    id: "select",
    enableSorting: false,

    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        className="h-4 w-4"
      />
    ),

    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4"
      />
    ),
  },

  /* invoice number */
  {
    accessorKey: "invoiceNumber",

    header: ({ column }) => (
      <SortableHeader column={column} title="Invoice Number" />
    ),

    cell: ({ row }) => (
      <span className="font-medium text-blue-500">
        #{row.original.invoiceNumber}
      </span>
    ),
  },

  /* customer */
  {
    accessorKey: "customer",

    header: ({ column }) => <SortableHeader column={column} title="Customer" />,

    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.customer}
      </span>
    ),
  },

  /* Creation Date */
  {
    accessorKey: "creationDate",

    header: ({ column }) => (
      <SortableHeader column={column} title="Creation Date" />
    ),

    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.original.creationDate)}
      </span>
    ),
  },

  /* due date */
  {
    accessorKey: "dueDate",

    header: ({ column }) => <SortableHeader column={column} title="Due Date" />,

    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.original.dueDate)}
      </span>
    ),
  },

  //   /* total */
  //   {
  //     accessorKey: "total",

  //     header: ({ column }) => <SortableHeader column={column} title="Total" />,

  //     cell: ({ row }) => (
  //       <span className="text-blue-500 font-medium">
  //         ${row.original.total.toLocaleString()}
  //       </span>
  //     ),
  //   },

  /* status */
  {
    accessorKey: "status",
    enableSorting: false,

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;
      return <span className={statusStyles[status]}>{status}</span>;
    },
  },

  /* actions */
  {
    id: "actions",
    enableSorting: false,

    header: "",

    cell: () => (
      <button>
        <MoreHorizontal size={18} />
      </button>
    ),
  },
];
