import DashboardLayout from "../components/reusable/DashboardLayout";
import EcomCard from "../components/ecom/EcomCard";
import MonthlyTarget from "../components/ecom/MonthlyTarget";
import SalesBar from "../components/ecom/SalesBar";
import AreaLineChart from "../components/reusable/AreaChart";
import WorldMap from "../components/ecom/WorldMap";

const Ecom = () => {
  return (
    <DashboardLayout>
      <div className="w-full min-w-0 max-w-full bg-[#F9FBFA] dark:bg-[#101929] p-5">
        {/*
          Fixed: removed `grid-rows-3` — forcing 3 equal-height rows on a
          container with no explicit height was squeezing the taller
          AreaLineChart card, causing it to overflow into the next row.
          Rows now auto-size to their content instead.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left column: customer/order cards + sales bar */}
          <div className="lg:col-span-7 min-w-0 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <EcomCard title="customers" num="3,782" percentage="11.01" />
              <EcomCard title="orders" num="5,359" percentage="-9.05" />
            </div>
            <SalesBar />
          </div>

          {/* Right column: monthly target
              (was: lg:cols-span-5 — invalid class, silently dropped) */}
          <div className="lg:col-span-5 min-w-0">
            <MonthlyTarget />
          </div>

          {/* Full-width statistics chart */}
          <div className="lg:col-span-12 min-w-0">
            <AreaLineChart />
          </div>

          {/* Full-width world map
              (was: no col-span at all — defaulted to 1 of 12 columns) */}
          <div className="lg:col-span-12 min-w-0">
            <WorldMap />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Ecom;