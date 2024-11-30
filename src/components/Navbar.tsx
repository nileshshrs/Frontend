import { Link, useLocation } from "react-router-dom";
import { FaRegCompass, FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { IoChatbubbles, IoNotifications, IoPersonSharp } from "react-icons/io5";
import { toggler } from "../utils/types";
import Settings from "./Settings";

const Navbar = ({ isCollapsed, onNotificationToggle }: toggler) => {


    const location = useLocation();
    const pathname = location.pathname;

    const toggle = () => {
        onNotificationToggle(); // Toggle notification menu
    }

    return (
        <nav
            className={`sm:grid min-h-screen h-full hidden top-0 left-0 place-items-center py-7 border-r border-gray-300 z-10
          ${isCollapsed ? "max-w-[70px]" : "max-w-[300px] px-5"} transition-all duration-300 w-full sticky`}
        >
            <ul className="h-full flex flex-col justify-start gap-5 items-center p-0 content-center w-full">
                {/* Logo */}
                <li className="mb-5">
                    {isCollapsed ? null : <span>LOGO</span>}
                </li>

                {/* Home Link */}
                <li className="w-full mt-5 mb-3">
                    <Link
                        to="/"
                        className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <FaRegCompass className="text-2xl" />
                        {!isCollapsed && <span className={pathname === '/' ? 'font-bold' : ''}>Home</span>}
                    </Link>
                </li>

                {/* Search Button */}
                <li className="w-full mb-3">
                    <span
                        onClick={toggle}
                        className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <FaSearch className="text-2xl" />
                        {!isCollapsed && <span>Search</span>}
                    </span>
                </li>

                {/* Messages Link */}
                <li className="w-full mb-3">
                    <Link
                        to="/messages"
                        className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <IoChatbubbles className="text-2xl font-bold" />
                        {!isCollapsed && <span>Messages</span>}
                    </Link>
                </li>

                {/* Notifications Button */}
                <li className="w-full mb-3">
                    <span
                        onClick={toggle}
                        className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <IoNotifications className="text-2xl font-bold" />
                        {!isCollapsed && <span>Notifications</span>}
                    </span>
                </li>

                {/* Plus Icon */}
                <li className="w-full mb-3">
                    <div className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}>
                        <FaRegPlusSquare className="text-2xl font-bold" />
                        {!isCollapsed && <span>Create</span>}
                    </div>
                </li>

                {/* User Profile Link */}
                <li className="w-full mb-3">
                    <Link
                        to="/profile"
                        className={`inline-flex w-full gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <IoPersonSharp className="text-2xl font-bold" />
                        {!isCollapsed && <span className={pathname === '/profile' ? 'font-bold' : ''}>Profile</span>}
                    </Link>
                </li>
            </ul>

            {/* Menu Button */}
            <div className="flex items-end h-full w-full justify-start">
                <Settings />
            </div>
        </nav>
    );
};

export default Navbar;
