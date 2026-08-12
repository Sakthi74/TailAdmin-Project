import AddProduct from "@/components/product/AddProduct";
import DashboardLayout from "@/components/reusable/DashboardLayout";
import ProductHeader from "@/components/product/ProductHeader";
const AddProductPage = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background">
      <DashboardLayout>
        <div>
          <ProductHeader />
          <div className="m-4">
            <AddProduct />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AddProductPage;
