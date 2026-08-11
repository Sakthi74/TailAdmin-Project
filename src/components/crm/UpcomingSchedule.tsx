import { EllipsisVertical } from "lucide-react";
import { Card } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";

interface ScheduleItem {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  more: number;
}

const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    date: "Wed, 11 Jan",
    time: "09:20 AM",
    title: "Business Analytics Press",
    description: "Exploring the Future of Data-Driven",
    more: 6,
  },
  {
    id: 2,
    date: "Fri, 15 Feb",
    time: "10:35 AM",
    title: "Business Sprint",
    description: "Techniques from Business Sprint",
    more: 2,
  },
  {
    id: 3,
    date: "Thu, 18 Mar",
    time: "1:15 AM",
    title: "Customer Review Meeting",
    description: "Insights from the Customer Review Meeting",
    more: 8,
  },
];

const UpcomingSchedule = () => {
  return (
    <Card className="w-full p-5">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Upcoming Schedule</h2>
        <div className="cursor-pointer ">
          <EllipsisVertical size={18} />
        </div>
      </header>

      <div className="flex flex-col divide-y divide-border">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
          >
            <Checkbox className="mt-1 shrink-0" />

            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 w-full">
              <div className="text-sm text-muted-foreground w-24 shrink-0">
                <p className="font-medium text-foreground">{item.date}</p>
                <p>{item.time}</p>
              </div>

              <div className="min-w-0">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {item.description} +{item.more} more
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingSchedule;
