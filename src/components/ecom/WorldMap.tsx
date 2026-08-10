import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import worldMap from "world-atlas/countries-110m.json";
import { EllipsisVertical } from "lucide-react";
import { Card } from "../../ui/card";
import { worldMapData } from "../../data/worldMapData";

const WorldMap = () => {
  return (
    <Card className="w-full min-w-0 lg:w-[600px] p-5">
      <header className="flex items-start justify-between px-5 py-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            customers demography
          </h2>

          <p className="text-sm text-muted-foreground">
            Number of customers based on country
          </p>
        </div>

        <div className="cursor-pointer rounded-md border p-1">
          <EllipsisVertical size={18} />
        </div>
      </header>

      {/* Fixed: w-[550px] caused overflow on small screens. w-full + max-w-full
          lets the map's internal SVG scale down with its container. */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
        }}
        className="h-56 w-full max-w-full bg-[#F9FBFA] border rounded-2xl"
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
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      fill: "#465FFF",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#3641C7",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </Card>
  );
};

export default WorldMap;