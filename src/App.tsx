import { useTheme } from "./context/ThemeContext"
import { Button } from "./components/ui/button";
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import Login from "./pages/Login";
import "./App.scss"
import Registration from "./pages/Registration";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";


function App() {

  const { theme, toggleTheme } = useTheme();

  return (
    <>

      <div className="relative">
        <Button
          className={`
        p-2 rounded
        ${theme === 'light' ? ' text-black  hover:text-black' :
              ' text-white hover:text-white'}
           absolute top-5 right-5 shadow-none text-lg
      `}
          onClick={toggleTheme}
          style={{ backgroundColor: 'transparent' }}
        >{theme === "light" ? <FaMoon className="text-3xl" /> : <MdLightMode className="text-3xl" />}
        </Button>
        <Routes>
          <Route path="/" element={<Home />} />
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
