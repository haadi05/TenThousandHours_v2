import * as React from "react";
("use client");
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import ThemeDropdown from "./ThemeDropdown.jsx";

function AddCard() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Card className="flex h-full justify-center items-center cursor-pointer border-2 transition delay-40 duration-160 ease-in hover:border-2 hover:border-muted-foreground">
            <div className="flex flex-col justify-center items-center">
              <img className="size-16" src="/plus.svg" />
              <p className="font-medium text-lg mt-2">Add New Skill</p>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="w-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              Add New Skill
            </DialogTitle>
            <div>
              <div className="grid w-full items-center gap-2">
                <Label>Skill Name</Label>
                <Input
                  type="text"
                  placeholder="e.g. Chess, Coding, Editing"
                  className="mb-4"
                />

                <Label>Goal</Label>
                <Input
                  type="number"
                  min={0}
                  max={24}
                  className="no-arrows mb-4"
                  placeholder="Enter your Goal Hours"
                />

                <Label>Initial hours</Label>
                <Input
                  type="number"
                  min={0}
                  className="no-arrows mb-4"
                  placeholder="Hours Practiced Before (Optional)"
                />

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

                <Label>Theme</Label>
                <ThemeDropdown />

                <Button
                  className="cursor-pointer text-md font-bold hover:bg-secondary mt-4"
                  type="submit"
                >
                  Add Skill
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCard;
