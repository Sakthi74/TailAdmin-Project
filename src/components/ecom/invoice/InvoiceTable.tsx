import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { Button } from "../../../ui/button";
import { useState, useEffect } from "react";
import { invoiceColumns, type Invoice } from "./InvoiceColumn";
import { getInvoiceLocalStorage } from "@/ServiceLayer/InvoiceStorage";
import { Search, Download, SlidersHorizontal } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../ui/table";

type FilterTab = "all" | "unpaid" | "draft";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const stored = getInvoiceLocalStorage();
    setInvoices(stored as unknown as Invoice[]);
  }, []);

  const table = useReactTable({
    data: invoices,
    columns: invoiceColumns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalRows = invoices.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
  const pageCount = table.getPageCount();

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All Invoices" },
    { key: "unpaid", label: "Unpaid" },
    { key: "draft", label: "Draft" },
  ];

  return (
    <div className="w-full min-w-0 rounded-xl dark:bg-[#171F2E] bg-white p-2">
      <div className="flex w-full gap-3 lg:justify-between md:justify-between flex-col lg:flex-row md:flex-row p-3 sm:w-auto">
        {/* Title + Description */}
        <div>
          <h2 className="text-base font-semibold dark:text-foreground text-black md:text-lg">
            Invoices
          </h2>
          <p className="text-sm text-muted-foreground">
            Your most recent invoices list
          </p>
        </div>

        {/* actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* filter tabs */}
          <div className="flex items-center bg-muted rounded-lg p-1 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-white dark:bg-[#1C2938] text-foreground font-medium shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* search */}
          <div className="relative w-full sm:w-56">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <Button
            variant="outline"
            className="h-11 border border-border cursor-pointer"
            size="sm"
          >
            <SlidersHorizontal size={16} className="mr-1" />
            Filter
          </Button>

          <Button
            variant="outline"
            className="h-11 border border-border cursor-pointer"
            size="sm"
          >
            <Download size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={invoiceColumns.length}
                  className="h-20 text-center text-muted-foreground"
                >
                  No invoices found.
                </TableCell>
              </TableRow>
            )}

            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="h-16">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{startRow}</span> to{" "}
          <span className="font-medium text-foreground">{endRow}</span> of{" "}
          <span className="font-medium text-foreground">{totalRows}</span>
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-9 w-9 p-0"
          >
            ←
          </Button>

          {Array.from({ length: pageCount }, (_, i) => i).map((page) => (
            <Button
              key={page}
              variant={page === pageIndex ? "default" : "outline"}
              size="sm"
              onClick={() => table.setPageIndex(page)}
              className={`h-9 w-9 p-0 ${
                page === pageIndex ? "bg-[#465FFF] text-white" : ""
              }`}
            >
              {page + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-9 w-9 p-0"
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
