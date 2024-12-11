import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Logout } from "../api/api";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    // Using useMutation for the logout request
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: Logout,
        onSuccess: () => {
            // On success, clear local storage and dispatch logout action
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
            navigate("/sign-in"); // Redirect to sign-in page after logout
        },
        onError: (error) => {
            // Handle error (optional)
            console.error("Logout failed:", error);
        }
    });

    return { logout };
};
