import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import type { Product } from "@/ServiceLayer/ProductFetch";
import { productColumns } from "./ProductColumn";
import { getProducts } from "@/ServiceLayer/ProductFetch";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../ui/table";

const ProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

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
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="w-full overflow-x-auto p-8  bg-white rounded-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductList;
