import { SlMenu } from "react-icons/sl";
import { Button } from "../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useTheme } from "../context/ThemeContext";
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { useLogout } from "../hooks/useLogout";


const Settings = () => {
    const { theme, toggleTheme } = useTheme()
    const { logout } = useLogout()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="hover:bg-transparent border-none "><SlMenu /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px] flex flex-col gap-4 py-5">
                <DropdownMenuCheckboxItem
                    className=""
                >
                    <Link to="/sessions" className="inline-flex items-center gap-3 text-md font-semibold"><IoSettings className="text-xl" /> settings</Link>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                >
                    <span className="inline-flex items-center gap-3 text-md font-semibold" onClick={toggleTheme}
                    >
                        {theme === "light" ? <FaMoon className="text-lg" /> : <MdLightMode className="text-xl" />} appearance
                    </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    className="font-semibold"
                    onClick={() => logout()}
                >
                    logout
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Settings