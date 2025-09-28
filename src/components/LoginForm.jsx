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

export default function LoginForm({ className, ...props }) {
  const { setUser } = useAuth();

  const handleLogin = () => {
    firebaseSignIn((loggedInUser) => setUser(loggedInUser));
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="flex justify-center items-center">
            <CardTitle>Login to your account</CardTitle>
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
