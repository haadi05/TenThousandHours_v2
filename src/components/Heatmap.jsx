import HeatMap from "@uiw/react-heat-map";
import { useEffect, useState } from "react";
import useSkillStore from "../store/skillStore";
import { useParams } from "react-router-dom";

const HeatMapGraph = () => {
  const { skills, updateSkill } = useSkillStore();

  //Take url id as parameter
  const { id } = useParams();
  const skillObj = skills.find((s) => String(s.id) === id);
  const loggedHours = skillObj.loggedHours;

  const [loggedHoursVault, setLoggedHoursVault] = useState([]);

  // d is short name for new Date
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); //+1 cuz js months start(Jan) with 0 like arrays
    const day = String(d.getDate()).padStart(2, "0"); // 09 cuz js returns only 9
    return `${year}/${month}/${day}`;
  };

  const today = formatDate(new Date());

  useEffect(() => {
    setLoggedHoursVault((prev) => [prev, { date: today, count: loggedHours }]);
    const updates = { loggedHoursVault };
    updateSkill(skillObj.id, updates);
  }, [loggedHours]);

  const value = skillObj.loggedHoursVault;

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
            1: "#3d3d3d",
            3: "#949494",
            6: "#c7c7c7",
            8: "#e3e3e3",
            10: "#ffffff",
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-2 w-full ">
        <span className="text-xs text-gray-400">Less</span>
        <div className="flex gap-1 [&>*]:rounded-full [&>*]:w-4 [&>*]:h-4">
          <span
            style={{
              backgroundColor: "#3d3d3d",
            }}
          ></span>
          <span
            style={{
              backgroundColor: "#949494",
            }}
          ></span>
          <span
            style={{
              backgroundColor: "#c7c7c7",
            }}
          ></span>
          <span
            style={{
              backgroundColor: "#ffffff",
            }}
          ></span>
        </div>
        <span className="text-xs text-gray-400 ">More</span>
      </div>
    </>
  );
};

export default HeatMapGraph;
