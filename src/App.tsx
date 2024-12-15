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
import Conversation from "./components/message/Conversation";
import Message from "./components/message/Message";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const { user, loading } = useAuthContext(); // Get `loading` from AuthContext

    // If loading, render a blank page (nothing).
    if (loading) {
        return null; // Render nothing while loading
    }

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
                    {user ? (
                        <>
                            <Route path="/messages/" element={<Messages />}>
                                <Route index element={<Conversation />} />
                                <Route path=":id" element={<Message />} />
                            </Route>
                            <Route path="/sessions" element={<Sessions />} />
                        </>
                    ) : (
                        <Route path="/messages" element={<Navigate to="/sign-in" />} />
                    )}
                </Route>

                {showAuthRoutes ? (
                    <>
                        <Route path="/sign-in" element={<Login />} />
                        <Route path="/sign-up" element={<Registration />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/password/reset" element={<ResetPassword />} />
                    </>
                ) : (
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
