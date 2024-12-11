import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useMutation } from '@tanstack/react-query';
import { login } from "../api/api";
import { LoginData } from "../utils/types";

export const useSignin = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    // Mutation for login
    const { mutate: signin, isError } = useMutation(
        async (data: LoginData) => {
            const response = await login(data);
            return response.user; // Extract user from response
        },
        {
            onSuccess: (user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    dispatch({ type: "LOGIN", payload: user });
                    navigate("/"); // Redirect to homepage or dashboard
                }
            },
            onError: (error) => {
                // Handle error if needed (e.g., display a toast or log)
                console.error("Signin failed:", error);
            }
        }
    );

    return { signin, isError };
};
