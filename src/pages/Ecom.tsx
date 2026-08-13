import DashboardLayout from "../components/reusable/DashboardLayout";
import EcomCard from "../components/ecom/EcomCard";
import MonthlyTarget from "../components/ecom/MonthlyTarget";
import SalesBar from "../components/ecom/SalesBar";
import AreaLineChart from "../components/reusable/AreaChart";
import WorldMap from "../components/ecom/WorldMap";
import RecentOrders from "@/components/ecom/RecentOrders";
import { earningsData } from "../../src/data/Revenue";

const Ecom = () => {
  return (
    <DashboardLayout>
      <div className="w-full min-w-0 max-w-full bg-[#F9FBFA] dark:bg-[#101929] p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* customer order cards and sales bar */}
          <div className="lg:col-span-7 min-w-0 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <EcomCard title="customers" num="3,782" percentage="11.01" />
              <EcomCard title="orders" num="5,359" percentage="-9.05" />
            </div>
            <SalesBar />
          </div>

          {/* monthly target */}

          <div className="lg:col-span-5 min-w-0">
            <MonthlyTarget />
          </div>

          <div className="lg:col-span-12 min-w-0">
            <AreaLineChart data={earningsData} />
          </div>

          <div className="lg:col-span-5 min-w-0">
            <WorldMap />
          </div>
          <div className="lg:col-span-7 min-w-0">
            <RecentOrders />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Ecom;
