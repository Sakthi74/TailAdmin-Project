import ProductHeader from "../components/product/ProductHeader";
import ProductList from "../components/product/ProductList";
import DashboardLayout from "@/components/reusable/DashboardLayout";

const Product = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background">
      <DashboardLayout>
        <div>
          <ProductHeader />
          <div className="mx-8">
            <ProductList />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Product;
