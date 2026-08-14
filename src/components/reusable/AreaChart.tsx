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
import { Badge } from "../../ui/badge";
import SegmentedTabs from "../reusable/SegmentedTabs";

const TABS = ["Monthly", "Quarterly", "Annually"] as const;
type Tab = (typeof TABS)[number];

interface ChartData {
  month: string;
  revenue: number;
  target: number;
}
import { useLocation } from "react-router-dom";

interface AreaLineChartProps {
  data: ChartData[];
}

const AreaLineChart = ({ data }: AreaLineChartProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("Quarterly");

  const location = useLocation();

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
          {location.pathname === "/crm" ? (
            <div className=" flex gap-4">
              <div className="hidden md:block pt-5 p-2">
                <div className="flex justify-center gap-3 items-center">
                  <h1 className="text-xl font-bold">$212,142.12</h1>

                  <Badge className="bg-[#EDFDF3] text-[#1D9F61] dark:bg-[#173539] dark:text-green">
                    +23.2%
                  </Badge>
                </div>

                <p className="text-sm text-[#A8B5C0]">Avg. Yearly Profit</p>
              </div>
              <div className="hidden md:block pt-5 lg:mr-12">
                <div className="flex justify-center gap-3 items-center">
                  <h1 className="text-xl font-bold">$30,321.23</h1>

                  <Badge className="bg-[#FFF2F2] text-[#E36961] dark:bg-[#382531] dark:text-red-500">
                    -12.3%
                  </Badge>
                </div>

                <p className="text-sm text-[#A8B5C0]">Avg. Yearly Profit</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex gap-3 w-full md:w-auto shrink-0">
          <SegmentedTabs
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
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
