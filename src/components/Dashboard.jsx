import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { HeatMapGraph } from "../importStore";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSkillStore from "../store/skillStore";

function Dashboard() {
  //Take url id as parameter
  const { id } = useParams();
  const navigate = useNavigate();
  const { skills, logHours } = useSkillStore();
  const skill = skills.find((s) => String(s.id) === id);

  if (!skill)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <p className="text-lg mb-4">Skill not found.</p>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </div>
    );

  const [loggedHours, setLoggedHours] = useState(0);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const goal = skill.goalHours || 10000;
  const logged = skill.loggedHours || 0;
  const remaining = goal - logged;
  const progressPercent = Math.min((logged / goal) * 100, 100).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loggedHours <= 0) return;
    if (loggedHours > goal)
      return setErrorMsg("You can’t log more hours than your goal.");
    if (loggedHours > remaining)
      return setErrorMsg("You can’t log more hours than your goal.");

    logHours(skill.id, Number(loggedHours));
    setLoggedHours(0);
    setErrorMsg("");
    setOpen(false);
  };

  return (
    <div className="min-h-screen text-white p-8 [&>*]:outline-none">
      <div className="mx-44">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Overview</h2>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              asChild
              onClick={() => {
                setOpen(true);
              }}
            >
              <Button className="px-6 py-2 font-bold text-md cursor-pointer">
                Log Hours
              </Button>
            </DialogTrigger>

            <DialogContent aria-describedby={undefined} className="w-94">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">
                  Log Hours
                </DialogTitle>
              </DialogHeader>
              {errorMsg && <p className="text-red-400">{errorMsg}</p>}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() =>
                    setLoggedHours((h) => Math.max(0, Number(h) - 1))
                  }
                >
                  <img
                    src="/subtract.svg"
                    className="w-12 h-12 cursor-pointer"
                    alt="Subtract"
                  />
                </button>
                <Input
                  type="number"
                  value={loggedHours}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0 && value <= 16) setLoggedHours(value);
                  }}
                  max={16}
                  min={0}
                  className="no-arrows flex-1 text-center font-semibold"
                />
                <button
                  onClick={(e) =>
                    setLoggedHours((h) => {
                      if (loggedHours > 15) {
                        return h;
                      } else {
                        return Number(h) + 1;
                      }
                    })
                  }
                >
                  <img
                    src="/plus.svg"
                    className="w-12 h-12 cursor-pointer"
                    alt="Add"
                  />
                </button>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 font-semibold bg-muted text-accent-foreground hover:bg-accent"
                  onClick={() => {
                    setLoggedHours(0);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 font-bold cursor-pointer"
                >
                  Log
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="py-4 px-6">
            <div className="flex items-center gap-2 text-sm mb-1">
              <img className="size-5 mr-1" src="/skill.svg" /> Your Skill
            </div>
            <div className="text-2xl font-bold">{skill.skillName}</div>
          </Card>

          <Card className="py-4 px-6">
            <div className="flex items-center gap-2 text-sm mb-1">
              <img className="size-5 mr-1" src="/clock.svg" /> Logged Hours
            </div>
            <div className="text-2xl font-bold">{logged}h</div>
          </Card>

          <Card className="py-4 px-6">
            <div className="flex items-center gap-2 text-sm mb-1">
              <img className="size-5 mr-1" src="/target-arrow.svg" /> Remaining
            </div>
            <div className="text-2xl font-bold">{remaining}h</div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="px-6 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">
              {logged} / {goal}
            </span>
            <span className="text-gray-400 font-bold">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent}></Progress>
        </Card>

        {/* HeatMap section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Visual Progress</h2>
          <Card className="scrollbar flex justify-center overflow-x-auto items-center py-4 px-6">
            <HeatMapGraph />
          </Card>
        </div>

        {/* History Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">History</h2>

          {skill.history && skill.history.length > 0 ? (
            skill.history
              .slice()
              .reverse()
              .map((entry, index) => (
                <Card key={index} className="mb-3 py-4 px-6">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-lg font-semibold mb-1">
                        {entry.date}
                      </div>
                      <div className="text-gray-400">
                        Today's practice hours: {entry.hours}
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white text-3xl"></button>
                  </div>
                </Card>
              ))
          ) : (
            <p className="text-gray-500">No history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
