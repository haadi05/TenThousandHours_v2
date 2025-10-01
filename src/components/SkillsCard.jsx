import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

function SkillsCard() {
  const title = "Chess";
  const logged_hours = 21;
  const remaining = 10000;
  const theme = "red";
  const percentage = 21;
  const fillWidth = 21;

  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  return (
    <form>
      <Card className="px-6 py-4 cursor-pointer transition delay-40 duration-160 ease-in border-2 hover:border-muted-foreground ">
        <div>
          <div className="flex justify-between items-center mb-8">
            <p className="font-semibold text-2xl">{title}</p>
            {/* delete/edit btn */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="cursor-pointer">
                <img src="/dots.svg" />
              </PopoverTrigger>
              <PopoverContent className="outline-none w-fit p-1">
                <button className="outline-none cursor-pointer hover:bg-red-500 rounded-sm px-2 py-1">
                  Delete
                </button>
              </PopoverContent>
            </Popover>
          </div>

          {/* done and remaining hours */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex flex-col justify-center items-start">
              <span className="flex items-center justify-center text-gray-400">
                <img className="size-6 pr-1" src="/clock.svg" /> Logged
              </span>
              <p className="text-xl text-white font-semibold">
                {logged_hours}h
              </p>
            </div>

            <div className="flex flex-col justify-center items-end">
              <span className="flex items-center justify-center text-gray-400 ">
                <img className="size-6 pr-1" src="/target-arrow.svg" />
                Remaining
              </span>
              <p className="text-xl text-white font-semibold">{remaining}h</p>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
            <Progress value={percentage} />
          </div>
        </div>
      </Card>
    </form>
  );
}

export default SkillsCard;
