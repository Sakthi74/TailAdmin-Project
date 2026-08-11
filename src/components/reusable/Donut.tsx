import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { EllipsisVertical } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useLocation } from "react-router-dom";
import { Progress } from "../../ui/progress";

interface DonutData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  donutheader: string;
  donutdescription: string;
  donutdata: DonutData[];
  donutcount: string;
  donutpercentage: string;
}

const categoryStats = [
  {
    name: "Marketing",
    value: "$30,569.00",
    percent: 85,
  },
  {
    name: "Sales",
    value: "$20,486.00",
    percent: 55,
  },
];
const Donut = ({
  donutheader,
  donutdescription,
  donutdata,
  donutcount,
  donutpercentage,
}: Props) => {
  const location = useLocation();
  const ecomActive = location.pathname === "/ecommerce";
  const crmActive = location.pathname === "/crm";
  const text =
    location.pathname === "/crm"
      ? "text-sm text-gray-500"
      : "text-xl md:text-3xl lg:text-4xl font-medium";
  return (
    <Card className="w-full min-w-0 pt-4">
      <header className="flex items-start justify-between px-5">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {donutheader}
          </h2>

          <p className="text-sm text-muted-foreground">{donutdescription}</p>
        </div>

        <div className="cursor-pointer rounded-md border p-1">
          <EllipsisVertical size={18} />
        </div>
      </header>

      <div className="lg:h-56 h-24 md:h-32 w-full border-b relative">
        <ResponsiveContainer width="100%" height="120%">
          <PieChart>
            <Pie
              data={donutdata}
              dataKey="value"
              nameKey="name"
              cy="80%"
              innerRadius="120%"
              outerRadius="130%"
              startAngle={180}
              endAngle={0}
            >
              {donutdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute left-1/2 lg:bottom-9 bottom-2  -translate-x-1/2 text-center">
          <h1 className={text}>{donutcount}</h1>
          {donutpercentage.includes("%") ? (
            <Badge className="bg-[#EDFDF3] text-[#51C4B4]">
              {donutpercentage}
            </Badge>
          ) : (
            <p className="text-xl md:text-3xl lg:text-3xl font-bold">
              {donutpercentage}
            </p>
          )}
        </div>
      </div>

      {crmActive && (
        <div className="mt-5 space-y-4 p-5">
          {categoryStats.map((cat) => (
            <div
              key={cat.name}
              className="flex  flex-row sm:items-center sm:justify-between gap-20"
            >
              <div className="flex  items-center gap-2 shrink-0">
                <div>
                  <p className="text-sm font-medium">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.value}</p>
                </div>
              </div>

              <div className="flex items-center gap-3  w-40">
                <Progress value={cat.percent} className="flex-1" />
                <span className="text-sm font-medium w-10 text-right">
                  {cat.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {ecomActive && (
        <p className="text-center flex justify-center items-center lg:mb-12 sm:mb-5 text-[#B3B8C1]">
          You earn $3287 today, it's higher than last month. Keep up your good
          work!
        </p>
      )}
    </Card>
  );
};

export default Donut;
