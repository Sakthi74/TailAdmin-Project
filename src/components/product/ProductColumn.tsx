import type { ColumnDef, Column } from "@tanstack/react-table";
import type { Product } from "../../ServiceLayer/ProductFetch";
import { MoreHorizontal, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

/* Reusable sortable header */
const SortableHeader = ({
  column,
  title,
}: {
  column: Column<Product, unknown>;
  title: string;
}) => {
  const sorted = column.getIsSorted();

  return (
    <button
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-[#9299B2] text-left"
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

export const productColumns: ColumnDef<Product>[] = [
  /* Checkbox */
  {
    id: "select",
    enableSorting: false,
    size: 40,

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

  /* Product */
  {
    accessorKey: "title",
    size: 240,

    header: ({ column }) => <SortableHeader column={column} title="Products" />,

    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex min-w-0 max-w-[220px] items-center gap-3">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-10 w-10 shrink-0 rounded-md object-contain"
          />
          <span className="truncate font-medium" title={product.title}>
            {product.title}
          </span>
        </div>
      );
    },
  },

  /* Category */
  {
    accessorKey: "category",
    size: 140,

    header: ({ column }) => <SortableHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <p
          className="max-w-[130px] truncate text-left font-medium capitalize text-[#888E9D]"
          title={product.category}
        >
          {product.category}
        </p>
      );
    },
  },

  /* Brand */
  {
    accessorKey: "brand",
    size: 140,

    header: ({ column }) => <SortableHeader column={column} title="Brand" />,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <p
          className="max-w-[130px] truncate font-medium capitalize text-[#797E8A]"
          title={product.brand}
        >
          {product.brand}
        </p>
      );
    },
  },

  /* Price */
  {
    accessorKey: "price",
    size: 100,

    header: ({ column }) => <SortableHeader column={column} title="Price" />,

    cell: ({ row }) => (
      <span className="whitespace-nowrap font-medium text-[#797E8A]">
        ${row.original.price.toLocaleString()}
      </span>
    ),
  },

  /* Stock */
  {
    accessorKey: "stock",
    size: 120,

    header: ({ column }) => <SortableHeader column={column} title="Stock" />,

    cell: ({ row }) => {
      const stock = row.original.stock;

      return (
        <span
          className={
            stock === 0
              ? "whitespace-nowrap rounded-full bg-red-50 px-2 py-1 text-xs text-red-500"
              : "whitespace-nowrap rounded-full bg-green-50 px-2 py-1 text-xs text-green-600"
          }
        >
          {stock === 0 ? "Out of Stock" : "In Stock"}
        </span>
      );
    },
  },

  /* Created At */
  {
    accessorFn: (row) => row.meta.createdAt,
    id: "createdAt",
    size: 130,

    header: ({ column }) => (
      <SortableHeader column={column} title="Created At" />
    ),

    cell: ({ row }) => {
      const date = new Date(row.original.meta.createdAt);

      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },

  /* Actions */
  {
    id: "actions",
    enableSorting: false,
    size: 50,

    header: "",

    cell: () => (
      <button className="cursor-pointer text-muted-foreground hover:text-foreground">
        <MoreHorizontal size={18} />
      </button>
    ),
  },
];
