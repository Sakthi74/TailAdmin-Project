import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductList from "../product/ProductList";

const ProductHeader = () => {
  const location = useLocation();
  return (
    <div className="w-full  bg-[#F9FBFA]">
      <div className="flex min-h-18 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Product
        </h1>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Home</span>

          <ChevronRight size={16} className="text-muted-foreground" />

          <span className="font-medium text-foreground">product</span>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductHeader;
