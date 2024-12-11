import { useTheme } from "./context/ThemeContext";
import { Button } from "./components/ui/button";
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import Login from "./pages/Login";
import "./App.scss";
import Registration from "./pages/Registration";
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Main from "./components/Main";
import Messages from "./pages/Messages";
import Sessions from "./pages/Sessions";
import { setNavigate } from "./utils/navigation";
import Conversation from "./components/Conversation";
import Message from "./components/Message";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const navigate = useNavigate(); // React Router's navigate function
    setNavigate(navigate);

    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const { user } = useAuthContext();

    // Determine whether to show the login/signup pages or redirect to home if the user is logged in
    const showAuthRoutes = !user;

    return (
        <div className="relative">
            {(location.pathname === "/sign-in" || location.pathname === "/sign-up") && (
                <Button
                    className="absolute top-5 right-5 shadow-none text-lg"
                    variant={"ghost"}
                    onClick={toggleTheme}
                    style={{ backgroundColor: "transparent" }}
                >
                    {theme === "light" ? <FaMoon className="text-3xl" /> : <MdLightMode className="text-3xl" />}
                </Button>
            )}

            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<Home />} />
                    {/* Protected routes: Only accessible if the user is logged in */}
                    {user ? (
                        <>
                            <Route path="/messages/" element={<Messages />} >
                                <Route index element={<Conversation />} />
                                <Route path=":id" element={<Message />} />
                            </Route>
                            <Route path="/sessions" element={<Sessions />} />
                        </>
                    ) : (
                        // Redirect unauthenticated users from protected routes to login
                        <Route path="/messages" element={<Navigate to="/sign-in" />} />
                    )}
                </Route>

                {/* Auth routes: Only accessible if the user is not logged in */}
                {showAuthRoutes ? (
                    <>
                        <Route path="/sign-in" element={<Login />} />
                        <Route path="/sign-up" element={<Registration />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/password/reset" element={<ResetPassword />} />
                    </>
                ) : (
                    // Redirect logged-in users to home page if they try to access auth pages
                    <>
                        <Route path="/sign-in" element={<Navigate to="/" />} />
                        <Route path="/sign-up" element={<Navigate to="/" />} />
                        <Route path="/forgot-password" element={<Navigate to="/" />} />
                        <Route path="/password/reset" element={<Navigate to="/" />} />
                    </>
                )}
                
                <Route path="/email-verification/:code" element={<VerifyEmail />} />
            </Routes>
        </div>
    );
}

export default App;
