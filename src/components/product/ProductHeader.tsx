import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ProductHeader = () => {
  const location = useLocation();
  return (
    <div className="w-full  bg-[#F9FBFA] dark:bg-background">
      <div className="flex min-h-18 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          {location.pathname === "/products"
            ? "Product List"
            : location.pathname === "/billing"
              ? "Billing"
              : location.pathname === "/invoice"
                ? "Invoice"
                : location.pathname === "/create-invoice"
                  ? "Create Invoice"
                  : "Add Product"}
        </h1>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Home</span>

          <ChevronRight size={16} className="text-muted-foreground" />

          <span className="font-medium text-foreground">
            {" "}
            {location.pathname === "/products"
              ? "Products"
              : location.pathname === "/billing"
                ? "Billing"
                : location.pathname === "/invoice"
                  ? "Invoice"
                  : location.pathname === "/create-invoice"
                    ? "Create Invoice"
                    : "Add Product"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
