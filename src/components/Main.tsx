import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Main = () => {

    const { user, isLoading } = useAuth()

    console.log("main", user)
    return (
        isLoading ? <div>Loading...</div> :
            user ?
                <>
                    <Outlet />
                </> :
                <Navigate to="/sign-in"
                    replace
                    state={{
                        redirectURL: window.location.pathname
                    }}
                />
    )
}

export default Main