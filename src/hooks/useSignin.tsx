import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"
import { login } from "../api/api";
import { LoginData } from "../utils/types";


export const useSignin = () => {
    const { dispatch } = useAuthContext();

    const navigate = useNavigate();

    const signin = async (data:LoginData) => {
        const response = await login(data);
        const user = response.user;
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: "LOGIN", payload: user });
            navigate("/")
        } 
    }

    return { signin };
}