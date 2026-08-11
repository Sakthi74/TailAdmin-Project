import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import worldMap from "world-atlas/countries-110m.json";
import { EllipsisVertical } from "lucide-react";
import { Card } from "../../ui/card";
import { worldMapData } from "../../data/worldMapData";
import { Progress } from "../../ui/progress";

const countryStats = [
  { flag: "🇺🇸", name: "USA", customers: "2,379 Customers", percent: 79 },
  { flag: "🇫🇷", name: "France", customers: "589 Customers", percent: 23 },
];

const WorldMap = () => {
  return (
    <Card className="w-full min-w-0 lg:max-w-[600px] p-5">
      <header className="flex items-start justify-between px-2 sm:px-5 py-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Customers Demographic
          </h2>
          <p className="text-sm text-muted-foreground">
            Number of customers based on country
          </p>
        </div>

        <div className="cursor-pointer rounded-md border p-1 shrink-0">
          <EllipsisVertical size={18} />
        </div>
      </header>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140 }}
        className="h-40 sm:h-56 w-full max-w-full bg-[#F9FBFA] dark:bg-[#111929] border rounded-2xl"
      >
        <Geographies geography={worldMap}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = worldMapData.find(
                (item) => item.name === geo.properties.name,
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={country?.color ?? "#E5E7EB"}
                  stroke="#354155"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: "#465FFF",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: { fill: "#3641C7", outline: "none" },
                  }}
                  className=""
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="mt-5 space-y-4">
        {countryStats.map((country) => (
          <div
            key={country.name}
            className="flex  flex-row sm:items-center sm:justify-between gap-20"
          >
            <div className="flex  items-center gap-2 shrink-0">
              <span className="text-xl leading-none">{country.flag}</span>
              <div>
                <p className="text-sm font-medium">{country.name}</p>
                <p className="text-xs text-muted-foreground">
                  {country.customers}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3  w-40">
              <Progress value={country.percent} className="flex-1" />
              <span className="text-sm font-medium w-10 text-right">
                {country.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorldMap;
