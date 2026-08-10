import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { EllipsisVertical } from "lucide-react";
import { salesBar } from "../../data/salesBar";

const SalesBar = () => {
  return (
    <>
      {" "}
      <div className="bg-[#ffff] rounded-2xl border px-4 w-full h-72  mt-5 dark:bg-[#1C2130] dark:border-white flex flex-col ">
        <header className="flex justify-between items-center p-5">
          <h2 className="text-md font-bold">Monthly Sales</h2>

          <div className="">
            <EllipsisVertical />
          </div>
        </header>

        <div className="h-[350px] w-full p-4 md:overflow-x-hidden overflow-x-auto lg:overflow-x-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesBar}>
              <CartesianGrid vertical={false} stroke="#E2E8F0" />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <YAxis tickLine={false} axisLine={false} />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#475FFF"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default SalesBar;
