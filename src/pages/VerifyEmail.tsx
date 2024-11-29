import { useQuery } from "@tanstack/react-query"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Link, useParams } from "react-router-dom"
import { verifyEmail } from "../api/api"

const VerifyEmail = () => {
    const { code } = useParams()


    const { isLoading, isError, isSuccess, data, error } = useQuery({
        queryKey: ["emailVerification", code], // Differentiate queries by code
        queryFn: () => verifyEmail(code!), // Make sure code is passed into the function
        onError: (error: any) => console.error("Error:", error.message), // Log error globally
    });


    return (
        <main className="min-h-screen flex items-center justify-center">
            <Card className="max-w-sm w-full flex items-center justify-center">
                {
                    !isSuccess ? <CardContent>
                        <CardHeader className="flex-col items-center justify-center gap-5">
                            <CardTitle>Email Verification.</CardTitle>
                            <CardDescription>Your email has been verified successfully.</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-center">
                            <Link to="/sign-in" className="text-primary text-sm font-bold">
                                Sign in
                            </Link>
                        </CardFooter>
                    </CardContent> : < CardContent className="flex-col items-center justify-center" >
                        <CardHeader className="flex-col items-center justify-center gap-5">
                            <CardTitle>Email Verification.</CardTitle>
                            <CardDescription>There was an error verifying your email.</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-center">
                            <Link to="#" className="text-destructive text-sm font-bold">
                                Get a new link
                            </Link>
                        </CardFooter>
                    </CardContent>
                }
            </Card>
        </main>
    )
}

export default VerifyEmail
