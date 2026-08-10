import Donut from "../reusable/Donut";
import { monthlyTarget } from "../../data/monthlyTarget";

const MonthlyTarget = () => {
  return (
    <div className="bg-[#F3F4F7] lg:pb-10 md:pb-10 pb-4 rounded-2xl min-h-[380px] flex flex-col">
      <Donut
        donutheader="Monthly Target"
        donutdescription="Target you've set for each month"
        donutdata={monthlyTarget}
        donutcount="75.55%"
        donutpercentage="+10%"
      />

      <div className="flex justify-between sm:justify-center sm:gap-16 lg:gap-24 items-center mt-5 w-full px-6">
        <div>
          <p className="text-md font-medium text-[#95989F]">Target</p>
          <h1 className="font-bold text-lg">$20k</h1>
        </div>
        <div>
          <p className="text-md font-medium text-[#95989F]">Revenue</p>
          <h1 className="font-bold text-md">$20k</h1>
        </div>
        <div>
          <p className="text-md font-medium text-[#95989F]">Today</p>
          <h1 className="font-bold text-md">$20k</h1>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTarget;
