import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//firebase imports
import useAuth from "../hooks/useAuth";
import { firebaseSignIn } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ className, ...props }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await firebaseSignIn((loggedInUser) => setUser(loggedInUser));
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <p className="text-white flex justify-center items-center text-lg font-md">
          <img className="size-6 mr-1" src="/target.svg" /> Ten Thousand Hours
        </p>
        <Card className="w-xs">
          <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>Continue with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <Button
                onClick={handleLogin}
                variant="outline"
                className="w-full cursor-pointer"
              >
                <img className="size-6" src="/googleLogo.svg" />
                Login with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
