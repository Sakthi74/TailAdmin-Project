import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { EllipsisVertical } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

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

const Donut = ({
  donutheader,
  donutdescription,
  donutdata,
  donutcount,
  donutpercentage,
}: Props) => {
  return (
    <Card className="w-full pt-4">
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

      <div className="lg:h-56 h-44 md:h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutdata}
              dataKey="value"
              nameKey="name"
              innerRadius="75%"
              outerRadius="90%"
              paddingAngle={2}
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

        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-medium">
            {donutcount}
          </h1>
          {donutpercentage.includes("%") ? (
            <Badge className="bg-[#EDFDF3] text-[#51C4B4]">
              {donutpercentage}
            </Badge>
          ) : (
            <p className="text-sm pb-3 text-gray-500">{donutpercentage}</p>
          )}
        </div>
      </div>

      <p className="text-center flex justify-center items-center lg:mb-12 sm:mb-5 text-[#B3B8C1]">
        You earn $3287 today, it's higher than last month. Keep up your good
        work!
      </p>
    </Card>
  );
};

export default Donut;
