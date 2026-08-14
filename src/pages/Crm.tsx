import CrmStatsCard from "../components/crm/CrmStatsCard";
import DashboardLayout from "../components/reusable/DashboardLayout";
import AreaLineChart from "../components/reusable/AreaChart";
import { earningsData } from "../../src/data/Revenue";
import CrmDonut from "../components/crm/CrmDonut";
import SalesCategory from "@/components/crm/SalesCategory";
import UpcomingSchedule from "@/components/crm/UpcomingSchedule";
import RecentCrmOrders from "@/components/crm/RecentCrmOrders";

const Crm = () => {
  return (
    <DashboardLayout>
      <div className="w-full min-w-0 max-w-full bg-[#F9FBFA] dark:bg-[#101929] grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
        <div className="lg:col-span-12 flex flex-col sm:flex-row gap-4">
          <CrmStatsCard title="Active deal" percentage="+20" num=" $120,369" />
          <CrmStatsCard
            title="Revenue Total"
            percentage="+9.0"
            num=" $234,210"
          />
          <CrmStatsCard title="Closed deal" percentage="-4.5" num=" 874" />
        </div>

        <div className="lg:col-span-8 min-w-0">
          <AreaLineChart data={earningsData} />
        </div>

        <div className="lg:col-span-4 min-w-0">
          <CrmDonut />
        </div>

        <div className="lg:col-span-6 min-w-0">
          <SalesCategory />
        </div>

        <div className="lg:col-span-6 min-w-0">
          <UpcomingSchedule />
        </div>

        <div className="lg:col-span-12 min-w-0">
          <RecentCrmOrders />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Crm;
