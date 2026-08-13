import ProductHeader from "../components/product/ProductHeader";
import DashboardLayout from "@/components/reusable/DashboardLayout";
import CreateInvoices from "@/components/ecom/invoice/CreateInvoice";

const CreateInvoicePage = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background w-full">
      <DashboardLayout>
        <div>
          <ProductHeader />
          <div className="lg:mx-8 mx-6 md:mx-6">
            <CreateInvoices />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default CreateInvoicePage;
