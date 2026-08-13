import ProductHeader from "../components/product/ProductHeader";
import ProductList from "../components/product/ProductList";
import DashboardLayout from "@/components/reusable/DashboardLayout";

const Product = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background min-w-0">
      <DashboardLayout>
        <div className="min-w-0">
          <ProductHeader />
          <div className="mx-4 sm:mx-6 lg:mx-8 min-w-0">
            <ProductList />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Product;
