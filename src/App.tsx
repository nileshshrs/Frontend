import { useTheme } from "./context/ThemeContext"
import { Button } from "./components/ui/button";
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import Login from "./pages/Login";
import "./App.scss"
import Registration from "./pages/Registration";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Main from "./components/Main";
import Conversation from "./pages/Conversation";
import Sessions from "./pages/Sessions";



function App() {

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>

      <div className="relative">
        {
          (location.pathname === "/sign-in" || location.pathname === "/sign-up") ? (
            <Button
              className={`absolute top-5 right-5 shadow-none text-lg`}
              variant={"ghost"}
              onClick={toggleTheme}
              style={{ backgroundColor: 'transparent' }}
            >
              {theme === "light" ? <FaMoon className="text-3xl" /> : <MdLightMode className="text-3xl" />}
            </Button>
          ) : null
        }
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index path="/" element={<Home />} />
            <Route index path="/messages" element={<Conversation />} />
            <Route index path="/sessions" element={<Sessions />} />
          </Route>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/email-verification/:code" element={<VerifyEmail />} />
        </Routes>
      </div >
    </>
  )
}

export default App
