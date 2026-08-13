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
        <div className="flex w-full gap-3 lg:justify-between md:justify-between flex-col lg:flex-row md:flex-row p-3  sm:w-auto">
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
          <div className="flex gap-3 lg:mr-12">
            <button
              className="
      flex h-12 lg:flex-1 md:flex-1 items-center justify-center gap-2
      rounded-lg border border-border
      px-4 text-sm font-medium
      dark:text-foreground
      hover:bg-muted 
      sm:dark:bg-[#1C2938]
      sm:w-2/3 sm:flex-none text-[#5B5F76]
    "
            >
              Export
              <span>
                <Download size={16} className="text-[#676F7F]" />
              </span>
            </button>

            <button
              className="
      flex h-12 lg:flex-1 md:flex-1  items-center justify-center gap-2
      rounded-lg bg-[#465FFF]
       text-xs font-medium text-white
      hover:bg-[#3648D8] cursor-pointer text-left
      sm:w-1/2 sm:flex-none md:w-full lg:w-72
    "
              onClick={() => {
                navigate("/add-products");
              }}
            >
              <span className="text-lg leading-none">+</span>
              Add Product
            </button>
          </div>
        </div>

        <div className="flex justify-between border-y border-x-[#F2F1F2] p-4 ">
          <div className="relative w-full max-w-md ">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search ..."
              className="
              h-11
              w-2/3
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
            className="p-5 border w-24  border-gray-400cursor-pointer"
            size="sm"
          >
            <SlidersHorizontal />
            Filter
          </Button>
        </div>

        {/* TABLE  */}
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[640px]">
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
                    <TableCell key={cell.id} className="h-20">
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
