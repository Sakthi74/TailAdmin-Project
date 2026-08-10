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

import { earningsData } from "../../data/Revenue";

const TABS = ["Monthly", "Quarterly", "Annually"];

const AreaLineChart = () => {
  const [activeTab, setActiveTab] = useState("Quarterly");

  return (
    <div
      className="bg-white rounded-2xl p-5 md:p-8 lg:p-12 w-full min-w-0 col-span-12
                 flex flex-col
                 h-[420px] md:h-[380px]
                 dark:bg-[#1C2130] dark:border dark:border-white"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 shrink-0">
        <div>
          <h2 className="text-xl font-semibold">Statistics</h2>
          <p className="text-[#8290AB] text-sm">
            Target you&apos;ve set for each month
          </p>
        </div>

        {/* right side: also stacks on sm, row from md */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {/* segmented toggle */}
          <div className="flex items-center bg-[#EEF2F9] dark:bg-[#2A3040] rounded-lg p-1 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab}
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

          {/* date range pill */}
          <button className="flex items-center gap-2 border border-slate-200 dark:border-white/20 rounded-lg px-3 py-1.5 text-sm text-slate-700 dark:text-white whitespace-nowrap w-fit">
            <Calendar className="w-4 h-4 text-indigo-500" />
            Aug 04 to Aug 10
          </button>
        </div>
      </div>

      {/* flex-1 + min-h-0 lets this fill remaining space without ever
          collapsing to 0 or blowing past the card's fixed height above */}
      <div className="flex-1 min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minHeight={180}>
          <AreaChart
            data={earningsData}
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

            <CartesianGrid vertical={false} stroke="#E2E8F0" />

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
              type="monotone"
              dataKey="revenue"
              stroke="#6A7DFF"
              strokeWidth={3}
              fill="url(#revenue)"
              dot={false}
              activeDot={{ r: 6 }}
            />

            <Area
              type="monotone"
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