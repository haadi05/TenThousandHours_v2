import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { HeatMapGraph } from "../importStore";

function Dashboard() {
  return (
    <>
      <div className="min-h-screen text-white p-8">
        <div className="mx-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Overview</h2>
            <Button className="px-6 py-2 font-bold text-md cursor-pointer">
              Log Hours
            </Button>
          </div>
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="py-4 px-6">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="flex">
                  <img className="size-5 mr-1" src="/skill.svg" /> Your Skill
                </span>
              </div>
              <div className="text-2xl font-bold">Chess</div>
            </Card>

            {/* Logged Hours */}
            <Card className=" py-4 px-6 ">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="flex">
                  <img className="size-5 mr-1" src="/clock.svg" /> Logged Hours
                </span>
              </div>
              <div className="text-2xl font-bold">0h</div>
            </Card>

            {/* Remaining */}
            <Card className="py-4 px-6">
              <div className="flex items-center gap-2  text-sm mb-1">
                <span className="flex items-center">
                  <img className="size-5 mr-1" src="/target-arrow.svg" />
                  Remaining
                </span>
              </div>
              <div className="text-2xl font-bold">10,000h</div>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card className="px-6 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">0 / 10,000</span>
              <span className="text-gray-400">
                <span className="font-bold">12.0%</span>
              </span>
            </div>
            <Progress value={21}></Progress>
          </Card>

          {/* Placeholder Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Visual Progress</h2>
            <Card className="flex justify-center items-center py-4 px-6">
              <div className="flex justify-end items-start"></div>
              <HeatMapGraph />
            </Card>
          </div>

          {/* History Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">History</h2>

            {/* History Item 1 */}
            <Card className="mb-3 py-4 px-6">
              <div className="flex justify-between">
                <div>
                  <div className="text-lg font-semibold mb-1">Sep 27, 2025</div>
                  <div className="text-gray-400">Today's practice hours: 5</div>
                </div>
                <button className="text-gray-400 hover:text-white text-3xl">
                  ×
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
