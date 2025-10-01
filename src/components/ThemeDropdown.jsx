import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ThemeDropdown() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Themes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="red">
            <div className="bg-red-400 rounded-full size-3"></div> Red
          </SelectItem>
          <SelectItem value="teal">
            <div className="bg-teal-400 rounded-full size-3"></div> Teal
          </SelectItem>
          <SelectItem value="blue">
            <div className="bg-blue-400 rounded-full size-3"></div> Blue
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export default ThemeDropdown;
