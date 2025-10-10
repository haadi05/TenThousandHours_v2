import * as React from "react";
("use client");
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { ThemeDropdown } from "../importStore.js";
import useSkillStore from "../store/skillStore.js";

function AddCard() {
  const { setSkill } = useSkillStore();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [skillName, setSkillName] = React.useState("");
  const [initialHours, setInitialHours] = React.useState(0);
  const [goalHours, setGoalHours] = React.useState(10000);
  const [date, setDate] = React.useState(new Date());
  // const [theme, setTheme] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSkill = {
      id: Date.now(),
      skillName,
      initialHours,
      goalHours,
      date,
      loggedHours: 0,
    };

    setSkill(newSkill);
    setSkillName("");
    setInitialHours(0);
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        className="[&>*]:outline-none"
      >
        <DialogTrigger
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <Card className="flex h-full justify-center items-center cursor-pointer border-2 transition delay-40 duration-160 ease-in hover:border-2 hover:border-muted-foreground">
            <div className="flex flex-col justify-center items-center">
              <img className="size-16" src="/plus.svg" />
              <p className="font-medium text-lg mt-2">Add New Skill</p>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className="w-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              Add New Skill
            </DialogTitle>
          </DialogHeader>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-2">
                <Label>Skill Name</Label>
                <Input
                  required
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. Chess, Coding, Editing"
                  className="mb-4"
                />

                <div className="flex justify-center items-center gap-2">
                  <div className="w-full flex flex-col gap-2">
                    <Label>Initial hours</Label>
                    <Input
                      type="number"
                      value={initialHours}
                      onChange={(e) => setInitialHours(e.target.value)}
                      min={0}
                      className="no-arrows mb-4"
                      placeholder="Hours Practiced Before (Optional)"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <Label>Goal</Label>
                    <Input
                      required
                      type="number"
                      value={goalHours}
                      onChange={(e) => setGoalHours(e.target.value)}
                      min={0}
                      max={10000}
                      className="no-arrows mb-4"
                      placeholder="Enter your Goal Hours"
                    />
                  </div>
                </div>

                {/* Date btn */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date" className="px-1">
                    Date
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal w-full mb-4"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* <Label>Theme</Label>
                  <ThemeDropdown /> */}

                <Button
                  className="cursor-pointer text-md font-bold hover:bg-secondary"
                  type="submit"
                >
                  Add Skill
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCard;
