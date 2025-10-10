import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useSkillStore from "../store/skillStore";

function DeletePopUp({ skills }) {
  const { deleteSkill } = useSkillStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteSkill(skills.id);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="outline-none cursor-pointer hover:bg-red-500 rounded-full p-2">
            <img src="/trash.svg" alt="Delete" />
          </button>
        </DialogTrigger>
        <DialogContent className="w-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Are you sure?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-md">
            Do you want to delete this skill?
          </DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <Button className="flex-1 font-semibold bg-muted text-accent-foreground hover:bg-accent">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 font-bold bg-red-500 text-white hover:bg-red-400 cursor-pointer"
              >
                Delete
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeletePopUp;
