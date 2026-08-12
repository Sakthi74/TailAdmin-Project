import InvoiceOverview from "@/components/ecom/invoice/InvoiceOverview";
import ProductHeader from "../components/product/ProductHeader";
import DashboardLayout from "@/components/reusable/DashboardLayout";

const Product = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background">
      <DashboardLayout>
        <div>
          <ProductHeader />
          <div className="mx-8">
            <InvoiceOverview />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Product;
