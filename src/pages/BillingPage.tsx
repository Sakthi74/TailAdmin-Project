import PlanDetails from "../../src/components/ecom/billing/PlanDetails";
import BillingInfo from "../../src/components/ecom/billing/BillingInfo";
import DashboardLayout from "@/components/reusable/DashboardLayout";
import ProductHeader from "@/components/product/ProductHeader";
import PaymentMethods from "@/components/ecom/billing/PaymentMethods";
import InvoiceTable from "@/components/ecom/invoice/InvoiceTable";

const BillingPage = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background">
      <DashboardLayout>
        <ProductHeader />
        <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2 ">
          <PlanDetails />

          <BillingInfo />

          <div className="w-full lg:col-span-2">
            <PaymentMethods />
          </div>
          <div className="w-full lg:col-span-2">
            <InvoiceTable />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default BillingPage;
