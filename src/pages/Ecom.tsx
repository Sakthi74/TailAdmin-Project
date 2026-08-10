import DashboardLayout from "../components/reusable/DashboardLayout";
import EcomCard from "../components/ecom/EcomCard";
import MonthlyTarget from "../components/ecom/MonthlyTarget";
import SalesBar from "../components/ecom/SalesBar";
import AreaLineChart from "../components/reusable/AreaChart";
import WorldMap from "../components/ecom/WorldMap";

const Ecom = () => {
  return (
    <div>
      <DashboardLayout>
        <div className="flex w-full bg-[#F9FBFA] dark:bg-[#101929]">
          {/* overall div */}
          <div className="grid lg:grid-rows-3 lg:grid-cols-12 md:grid-rows-3 md:grid-cols-1 grid-rows-1 grid-cols-1 p-5">
            {/* row 1 */}
            {/* left side */}
            <div className="col-span-7">
              {/* cards */}
              <div className="flex flex-col md:flex-row lg:flex-row ">
                <EcomCard title="customers" num="3,782" percentage="11.01" />
                <EcomCard title="orders" num="5,359" percentage="-9.05" />
              </div>
              <div className="p-4">
                <SalesBar />
              </div>
            </div>
            <div className="lg:cols-span-5 md:col-span-5 col-span-1 py-4 px-4 lg:w-full md:w-screen w-screen ">
              {/* right side */}
              <MonthlyTarget />
            </div>

            <AreaLineChart />
            <div className="">
              <WorldMap />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Ecom;
