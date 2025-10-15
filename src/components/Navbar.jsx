import useAuth from "../hooks/useAuth";
import { firebaseSignOut } from "../firebase/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, loading, setUser } = useAuth();
  const handleLogout = () => {
    firebaseSignOut(() => setUser(null));
  };
  return (
    <nav className="px-50 max-[1500px]:px-40 max-[1385px]:px-30 max-[1260px]:px-20 max-[580px]:px-10 py-4 flex justify-between items-center border-b-2">
      <div>
        <p className="text-3xl max-[480px]:text-2xl font-bold">
          <Link to={"/"}>Ten Thousand Hours</Link>
        </p>
        <p className="text-[18px] max-[400px]:text-[14px] font-normal text-[#a2a2a2]">
          Track. Improve. Master
        </p>
      </div>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer outline-none">
            <img className="size-11" src="./src/assets/logo.svg" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>user@email.com</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer flex justify-center items-center"
            >
              Signout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
