import { Card } from "./ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { EditPopUp } from "../importStore";
function SkillsCard({ skillObj }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const title = skillObj.skillName;
  const logged_hours = Number(skillObj.loggedHours) || 0;
  const goal_hours = Number(skillObj.goalHours) || 0;
  const percentage =
    goal_hours > 0 ? Math.min((logged_hours / goal_hours) * 100, 100) : 0;
  const theme = "red";

  return (
    <Card className="px-6 py-4 transition delay-40 duration-160 ease-in border-2 hover:border-muted-foreground ">
      <div>
        <div className="flex justify-between items-center mb-8">
          <p className="font-semibold text-2xl">{title}</p>

          {/* Edit Btn */}
          <Popover>
            <PopoverTrigger className="outline-none cursor-pointer hover:bg-accent rounded-full p-2">
              <img src="/dots.svg" />
            </PopoverTrigger>
            <PopoverContent side="left" className="w-fit bg-card border-0 p-0">
              <button className="outline-none cursor-pointer hover:bg-red-500 rounded-full p-2">
                <img src="/trash.svg" alt="Delete" />
              </button>
              <EditPopUp />
            </PopoverContent>
          </Popover>
        </div>

        {/* done and remaining hours */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex flex-col justify-center items-start">
            <span className="flex items-center justify-center text-gray-400">
              <img className="size-6 pr-1" src="/clock.svg" /> Logged
            </span>
            <p className="text-xl text-white font-semibold">{logged_hours}h</p>
          </div>

          <div className="flex flex-col justify-center items-end">
            <span className="flex items-center justify-center text-gray-400 ">
              <img className="size-6 pr-1" src="/target-arrow.svg" />
              Remaining
            </span>
            <p className="text-xl text-white font-semibold">{percentage}h</p>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <Progress value={percentage} />
        </div>

        <Button
          onClick={() => navigate(`/${skillObj.id}`)}
          className="w-full mt-8 mb-2 text-md font-bold"
        >
          Open Dashboard ➜
        </Button>
      </div>
    </Card>
  );
}

export default SkillsCard;
