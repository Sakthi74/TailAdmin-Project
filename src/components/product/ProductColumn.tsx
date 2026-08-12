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

export const productColumns: ColumnDef<Product>[] = [
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

  /* Product */
  {
    accessorKey: "title",

    header: ({ column }) => <SortableHeader column={column} title="Products" />,

    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-3">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-10 w-10 rounded-md object-contain"
          />
          <span className="font-medium">{product.title.slice(0, 20)}</span>
        </div>
      );
    },
  },

  /* Category */
  {
    accessorKey: "category",

    header: ({ column }) => <SortableHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <>
          <h1 className="text-[#888E9D] #99ABB8 text-transform:capitalize text-left font-medium">
            {product.category}
          </h1>
        </>
      );
    },
  },

  /* Brand */
  {
    accessorKey: "brand",

    header: ({ column }) => <SortableHeader column={column} title="Brand" />,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <>
          <h1 className="text-[#797E8A] text-transform: capitalize font-medium">
            {product.brand}
          </h1>
        </>
      );
    },
  },

  /* Price */
  {
    accessorKey: "price",

    header: ({ column }) => <SortableHeader column={column} title="Price" />,

    cell: ({ row }) => (
      <span className="text-[#797E8A] text-medium">
        ${row.original.price.toLocaleString()}
      </span>
    ),
  },

  /* Stock */
  {
    accessorKey: "stock",

    header: ({ column }) => <SortableHeader column={column} title="Stock" />,

    cell: ({ row }) => {
      const stock = row.original.stock;

      return (
        <span
          className={
            stock === 0
              ? "rounded-full bg-red-50 px-2 py-1 text-xs text-red-500"
              : "rounded-full bg-green-50 px-2 py-1 text-xs text-green-600"
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

    header: ({ column }) => (
      <SortableHeader column={column} title="Created At" />
    ),

    cell: ({ row }) => {
      const date = new Date(row.original.meta.createdAt);

      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },

  /* Actions */
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
