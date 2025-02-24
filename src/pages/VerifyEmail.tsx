import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../api/api";
import { useAuthContext } from "../context/AuthContext";

const VerifyEmail = () => {
  const { code } = useParams();
  const { user, updateUser } = useAuthContext();

  const { isSuccess } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code!), // Ensure code is passed
    onSuccess: () => {
      // If the user is loaded, update the verified property to true
      if (user) {
        updateUser({ ...user, verified: true });
      }
    },
    onError: (error: any) => console.error("Error:", error.message),
  });

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="max-w-sm w-full flex items-center justify-center">
        {isSuccess ? (
          <CardContent>
            <CardHeader className="flex-col items-center justify-center gap-5">
              <CardTitle>Email Verification.</CardTitle>
              <CardDescription className="text-center">
                Your email has been verified successfully.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center">
              <Link to="/" className="text-primary text-sm font-bold" replace>
                Home
              </Link>
            </CardFooter>
          </CardContent>
        ) : (
          <CardContent className="flex-col items-center justify-center">
            <CardHeader className="flex-col items-center justify-center gap-5">
              <CardTitle>Email Verification.</CardTitle>
              <CardDescription className="text-center">
                There was an error verifying your email.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center">
              <Link to="#" className="text-destructive text-sm font-bold">
                Get a new link
              </Link>
            </CardFooter>
          </CardContent>
        )}
      </Card>
    </main>
  );
};

export default VerifyEmail;
