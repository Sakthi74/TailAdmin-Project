import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
import { Badge } from "../../ui/badge";

const TABS = ["Monthly", "Quarterly", "Annually"];

interface ChartData {
  month: string;
  revenue: number;
  target: number;
}

interface AreaLineChartProps {
  data: ChartData[];
}

const AreaLineChart = ({ data }: AreaLineChartProps) => {
  const [activeTab, setActiveTab] = useState("Quarterly");

  return (
    <div
      className="bg-white rounded-2xl p-5 md:p-8 lg:p-12 w-full min-w-0 lg:h-full col-span-12
                 flex flex-col h-[420px] md:h-[380px]
                 dark:bg-[#171F2E] "
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 shrink-0">
        <div>
          <h2 className="text-xl font-semibold">Statistics</h2>

          <p className="text-[#8290AB] text-sm">
            Target you have've set for each month
          </p>
          <div className=" flex gap-4">
            <div className=" pt-5  p-2 justify-center  items-center ">
              <div className="flex justify-center gap-3 items-center ">
                <h1 className="text-xl md:text-xl lg:text-xl font-bold">
                  $212,142.12
                </h1>
                <Badge className="bg-[#EDFDF3] text-[#1D9F61] dark:bg-[#173539] dark:text-green">
                  +23.2%
                </Badge>
              </div>
              <p className="text-sm text-[#A8B5C0]">Avg. Yearly Profit</p>
            </div>
            <div className=" pt-5  lg:mr-12 justify-center gap-3 items-center ">
              <div className="flex justify-center gap-3 items-center ">
                <h1 className="text-xl md:text-xl lg:text-xl font-bold">
                  $30,321.23
                </h1>
                <Badge className="bg-[#FFF2F2] text-[#E36961] dark:bg-[#382531] dark:text-red-500">
                  -12.3%
                </Badge>
              </div>
              <p className="text-sm text-[#A8B5C0]">Avg. Yearly Profit</p>
            </div>
          </div>
        </div>

        <div className="flex  gap-3 w-full md:w-auto shrink-0">
          {" "}
          <div className="flex items-center bg-[#EEF2F9] dark:bg-[#2A3040] rounded-lg p-1 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white dark:bg-[#1C2130] text-slate-900 dark:text-white font-medium shadow-sm"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0  min-w-0">
        <ResponsiveContainer width="100%" height="100%" minHeight={180}>
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d4db5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#DBE0FF" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#F9F8FA" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />

            <Tooltip />

            <Area
              type="linear"
              dataKey="revenue"
              stroke="#6A7DFF"
              strokeWidth={3}
              fill="url(#revenue)"
              dot={false}
              activeDot={{ r: 6 }}
            />

            <Area
              type="linear"
              dataKey="target"
              stroke="#A5BFFF"
              strokeWidth={2}
              fill="none"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaLineChart;
