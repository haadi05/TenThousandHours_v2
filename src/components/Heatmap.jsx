import HeatMap from "@uiw/react-heat-map";

const value = [
  { date: "2025/01/11", count: 2 },
  { date: "2025/01/12", count: 4 },
  { date: "2025/01/13", count: 10 },
  { date: "2025/04/13", count: 5 },
  { date: "2025/06/18", count: 1 },
  { date: "2025/09/17", count: 7 },
  { date: "2025/11/23", count: 2 },
  { date: "2025/10/13", count: 6 },
  { date: "2025/12/31", count: 9 },
];

const HeatMapGraph = () => {
  return (
    <>
      <div>
        <HeatMap
          value={value}
          width={1400}
          height={170}
          weekLabels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          startDate={new Date("2025/01/01")}
          legendCellSize={0}
          rectProps={{
            rx: 40,
          }}
          rectSize={18}
          space={4}
          style={{ color: "#ffffff", "--rhm-rect-active": "white" }}
          panelColors={{
            0: "#373737",
            3: "#3d3d3d",
            6: "#666666",
            8: "#999999",
            10: "#b8b8b8",
            12: "#ffffff",
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-2 w-full ">
        <span className="text-xs text-gray-400">Less</span>
        <div className="flex gap-1 [&>*]:rounded-full [&>*]:w-4 [&>*]:h-4">
          <span
            style={{
              backgroundColor: "#373737" || "transparent",
            }}
          ></span>
          <span
            style={{
              backgroundColor: "#3d3d3d" || "transparent",
            }}
          ></span>
          <span
            style={{
              backgroundColor: "#666666" || "transparent",
            }}
          ></span>
          <span
            style={{
              backgroundColor: "#999999" || "transparent",
            }}
          ></span>
        </div>
        <span className="text-xs text-gray-400 ">More</span>
      </div>
    </>
  );
};

export default HeatMapGraph;
