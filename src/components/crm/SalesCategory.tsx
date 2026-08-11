import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface CategoryData {
  name: string;
  value: number;
  percent: number;
  products: string;
  color: string;
}

const categoryData: CategoryData[] = [
  {
    name: "Affiliate Program",
    value: 2040,
    percent: 48,
    products: "2,040 Products",
    color: "#3741F4",
  },
  {
    name: "Direct Buy",
    value: 1402,
    percent: 33,
    products: "1,402 Products",
    color: "#7592FF",
  },
  {
    name: "Adsense",
    value: 510,
    percent: 19,
    products: "510 Products",
    color: "#DDE9FF",
  },
];

const SalesCategory = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? categoryData[activeIndex] : null;

  return (
    <div className="bg-white rounded-2xl border p-4 w-full min-h-[302px] flex flex-col dark:bg-[#171F2E] dark:border-white/10 gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Sales Category</h2>
        <div className=" cursor-pointer ">
          <EllipsisVertical size={18} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center flex-1 gap-6">
        <div className="relative w-full sm:w-1/2 h-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    stroke="none"
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* center text, swaps on hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            {active ? (
              <>
                <h3 className="text-sm font-semibold text-foreground px-4">
                  {active.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {active.percent}% • {active.products}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-foreground">
                  Total 3.5K
                </h3>
                <p className="text-sm text-muted-foreground">2450</p>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          {categoryData.map((cat) => (
            <div key={cat.name} className="flex items-start gap-2">
              <div
                className="w-3 h-3 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {cat.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {cat.percent}% • {cat.products}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesCategory;
