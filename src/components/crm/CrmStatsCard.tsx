import { Card } from "@/ui/card";
import { Badge } from "../../ui/badge";

interface props {
  title: string;
  num: string;
  percentage: string;
}

const CrmStatsCard = ({ title, num, percentage }: props) => {
  return (
    <div className="p-3 w-full">
      {/* cards */}
      <Card className="border p-5 w-full">
        <h1 className="text-2xl font-bold">{num}</h1>
        <div className="flex justify-between">
          <h1 className="text-[#5E6173]">{title}</h1>
          <div className=" flex gap-2">
            <Badge
              className={`${Number(percentage) < 0 ? "bg-[#FFF2F2] text-red-500" : "text-green-500 bg-[#EDFDF3]"}`}
            >
              {percentage} %
            </Badge>
            <p className="text-xs text-gray-500">last month</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CrmStatsCard;
