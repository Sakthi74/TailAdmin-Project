import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { useState, useEffect } from "react";
import type { Product } from "@/ServiceLayer/ProductFetch";
import { productColumns } from "./ProductColumn";
import { getProducts } from "@/ServiceLayer/ProductFetch";
import {
  Search,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../ui/table";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProduct(data);
    };
    loadProducts();
  }, []);

  const table = useReactTable({
    data: product,
    columns: productColumns,
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

  return (
    <>
      <div className="w-full min-w-0 rounded-xl dark:bg-[#171F2E] bg-white p-2">
        <div className="flex w-full flex-col gap-3 p-3 sm:w-auto md:flex-row md:justify-between lg:flex-row lg:justify-between">
          {/* Title + Description */}
          <div>
            <h2 className="text-base font-semibold dark:text-foreground text-black md:text-lg">
              Products List
            </h2>

            <p className="text-sm text-muted-foreground">
              Track your store's progress to boost your sales.
            </p>
          </div>

          {/* actions */}
          <div className="flex shrink-0 gap-3">
            <button
              className="
                flex h-11 items-center justify-center gap-2
                rounded-lg border border-border
                px-4 text-sm font-medium
                text-[#5B5F76] dark:text-foreground
                hover:bg-muted
                dark:bg-[#1C2938]
              "
            >
              Export
              <Download size={16} className="text-[#676F7F]" />
            </button>

            <button
              className="
                flex h-11 cursor-pointer items-center justify-center gap-2
                rounded-lg bg-[#465FFF] px-4
                text-sm font-medium text-white
                hover:bg-[#3648D8]
              "
              onClick={() => {
                navigate("/add-products");
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Product
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-x-[#F2F1F2] p-4">
          <div className="relative w-full max-w-md">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search ..."
              className="
              h-11
              w-full
              shadow-black
              rounded-lg
              border
              focus:outline-[#E9EBFD]
            
              bg-background
              pl-11
              pr-14
              text-sm
              text-foreground
              outline-none
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-1
              focus:ring-blue-300
            "
            />
          </div>
          <Button
            variant="outline"
            className="w-24 cursor-pointer border border-gray-400 p-5"
            size="sm"
          >
            <SlidersHorizontal />
            Filter
          </Button>
        </div>

        {/* TABLE  */}
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[640px] table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="overflow-hidden"
                    >
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
                    colSpan={productColumns.length}
                    className="h-20 text-center text-muted-foreground"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              )}

              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="h-20 overflow-hidden"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 px-3"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 px-3"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
