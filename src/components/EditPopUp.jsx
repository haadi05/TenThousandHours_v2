import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeDropdown } from "../importStore";
import useSkillStore from "../store/skillStore";

function EditPopUp({ skills }) {
  const [openDialog, setOpenDialog] = useState(false);
  const name = skills.skillName;
  const goal = skills.goalHours;

  const { updateSkill } = useSkillStore();

  const [skillName, setSkillName] = useState(name);
  const [goalHours, setGoalHours] = useState(goal);
  //   const [theme, setTheme] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updates = {
      skillName,
      goalHours,
    };

    updateSkill(skills.id, updates);
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="outline-none cursor-pointer hover:bg-accent rounded-full p-2 size-10">
            <img src="/pencil.svg" alt="Edit" />
          </button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className="w-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              Edit Skill
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <Label>Skill Name</Label>
              <Input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g. Chess, Coding, Editing"
                className="mb-4"
              />

              <div className="w-full flex flex-col gap-2">
                <Label>Goal</Label>
                <Input
                  type="number"
                  value={goalHours}
                  onChange={(e) => setGoalHours(e.target.value)}
                  min={0}
                  max={10000}
                  className="no-arrows mb-4"
                  placeholder="Enter your Goal Hours"
                />
              </div>

              {/* <Label>Theme</Label>
              <ThemeDropdown /> */}

              <Button
                className="cursor-pointer text-md font-bold hover:bg-secondary"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditPopUp;
