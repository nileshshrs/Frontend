
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Logout } from "../api/api";



export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const logout = () => {
        //remove item
        Logout()
        localStorage.removeItem("user")
        dispatch({ type: "LOGOUT" })
        navigate("/sign-in");
    }

    return { logout }
}