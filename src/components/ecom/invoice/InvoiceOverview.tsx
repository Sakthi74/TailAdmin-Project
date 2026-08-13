import { metrics } from "@/data/metrics";
import { Card } from "@/ui/card";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "./InvoiceTable";
const InvoiceOverview = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 font-sans ">
      <Card className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md font-semibold text-slate-800 dark:text-slate-100">
            Overview
          </h2>
          <button
            className="bg-[#475FFF] cursor-pointer hover:bg-indigo-700 text-white px-4 h-11 rounded-lg text-sm font-medium transition-colors"
            onClick={() => {
              navigate("/create-invoice");
            }}
          >
            + Create an Invoice
          </button>
        </div>

        {/* Metrics Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {metrics.map((metric) => {
            return (
              <div
                key={metric.id}
                className="bg-white dark:bg-slate-900 border border-[#F1F3F6] dark:border-slate-800   py-3 first:rounded-l-xl last:rounded-r-xl  transition-shadow duration-200"
              >
                <div className="flex justify-between items-start m-3 ">
                  <span className="text-sm font-medium  text-[#C2C2C1] dark:text-slate-400">
                    {metric.label}
                  </span>
                </div>

                <div className="m-3">
                  <h3 className="text-3xl font-medium  text-slate-800 dark:text-slate-100">
                    {metric.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        <InvoiceTable />
      </Card>
    </div>
  );
};

export default InvoiceOverview;
