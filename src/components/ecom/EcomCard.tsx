import { Card } from "@/ui/card";
import { Users, Box } from "lucide-react";
import { Badge } from "../../ui/badge";

interface props {
  title: string;
  num: string;
  percentage: string;
}

const EcomCard = ({ title, num, percentage }: props) => {
  return (
    <div className="p-3 w-screen">
      {/* cards */}
      <Card className="border p-5 w-full">
        <div className="bg-[#F3F4F7] p-3 rounded-xl dark:bg-[#192030] dark:border dark:border-gray-400 w-fit">
          {title === "customers" ? <Users /> : <Box />}
        </div>
        <h1 className="text-gray-500">{title}</h1>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">{num}</h1>
          <Badge
            className={`${Number(percentage) < 0 ? "bg-[#FFF2F2] text-red-500" : "text-green-500 bg-[#EDFDF3]"}`}
          >
            {percentage} %
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default EcomCard;
