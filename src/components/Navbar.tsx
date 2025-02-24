import { Link, useLocation } from "react-router-dom";
import { FaRegCompass, FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { IoChatbubbles, IoNotifications, IoPersonSharp } from "react-icons/io5";
import { toggler } from "../utils/types";
import Settings from "./Settings";
import { useNotifications } from "../hooks/useNotifications";
import { useConversations } from "../hooks/useConversation";
import { useTheme } from "../context/ThemeContext";
import { MdDashboard } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";

const Navbar = ({ isCollapsed, onNotificationToggle, onSearchToggle, setCollapsed, onOpenChange }: toggler) => {

    const { theme } = useTheme();
    const { user } = useAuthContext()

    const location = useLocation();
    const pathname = location.pathname;

    const toggleNotification = () => {
        onNotificationToggle(); // Toggle notification menu
        setCollapsed((prev: boolean) => !prev); // Correctly toggle collapse state
    };

    const toggleSearch = () => {
        onSearchToggle(); // Toggle search menu
        setCollapsed((prev: boolean) => !prev); // Correctly toggle collapse state
    };
    const { unreadCount } = useNotifications()
    const { messageUnreadCount } = useConversations()

    const logoSrc = theme === 'light' ? '/image/nav-light.png' : '/image/nav-dark.png';
    const shutter = theme === 'light' ? '/image/shutter-dark.png' : '/image/shutter-light.png';



    return (
        <nav
            className={`sm:grid min-h-screen h-full hidden top-0 left-0 place-items-center py-7 border-r z-20 
            ${isCollapsed ? "max-w-[70px]" : "max-w-[300px] px-5"} transition-all duration-300 w-full sticky top-0 left-0 bg-background`}
        >
            <ul className="h-full flex flex-col justify-start gap-3 items-center p-0 content-center w-full">
                {/* Logo */}
                <li className={isCollapsed ? "mb-5" : "mb-5 w-full"}>
                    <Link to="/"> {isCollapsed ? <img src={shutter} className="w-[40px] " /> : <img src={logoSrc} />}</Link>
                </li>
                {
                    user && user.role === 'admin' && <li className="w-full mt-5 mb-3 p-3 rounded-md hover:bg-muted">
                        <Link
                            to="/dashboard"
                            className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                        >
                            <MdDashboard className="text-2xl" />
                            {!isCollapsed && <span className={pathname === '/dashboard' ? 'font-bold' : ''}>Dashboard</span>}
                        </Link>
                    </li>
                }


                {/* Home Link */}
                <li className={user && user.role ==='admin' ? "w-full mb-3 p-3 rounded-md hover:bg-muted": "w-full mb-3 mt-5 p-3 rounded-md hover:bg-muted"}>
                    <Link
                        to="/"
                        className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <FaRegCompass className="text-2xl" />
                        {!isCollapsed && <span className={pathname === '/' ? 'font-bold' : ''}>Home</span>}
                    </Link>
                </li>

                {/* Search Button */}
                <li className="w-full mb-3  hover:bg-muted p-3 rounded-md">
                    <span
                        onClick={toggleSearch}
                        className={`w-full inline-flex gap-5 items-center ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <FaSearch className="text-2xl" />
                        {!isCollapsed && <span>Search</span>}
                    </span>
                </li>

                {/* Messages Link */}
                <li className="w-full mb-3 inline-flex items-center justify-between relative  hover:bg-muted p-3 rounded-md">
                    <Link
                        to="/messages"
                        className={`
                  w-full inline-flex gap-5 items-center 
                  ${isCollapsed ? "justify-center" : "justify-start"}`
                        }
                    >
                        <IoChatbubbles className="text-2xl font-bold" />
                        {!isCollapsed && <span>Messages</span>}
                    </Link>
                    {messageUnreadCount > 0 && !isCollapsed && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hidden lg:block">
                            {messageUnreadCount > 9 ? '9+' : messageUnreadCount}
                        </span>
                    )}
                    {/* Show small unread count as a red circle when collapsed */}
                    {messageUnreadCount > 0 && isCollapsed && (
                        <span className="bg-red-500 w-[10px] h-[10px] rounded-full absolute right-5 top-3">
                        </span>
                    )}
                </li>

                {/* Notifications Button */}
                <li className="w-full mb-3 inline-flex items-center justify-between relative  hover:bg-muted p-3 rounded-md">
                    <span
                        onClick={toggleNotification}
                        className={`w-full inline-flex gap-5 items-center cursor-pointer ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                        <IoNotifications className="text-2xl font-bold" />
                        {!isCollapsed && <span>Notifications</span>}
                    </span>
                    {/* Show unread count if more than 0 */}
                    {unreadCount > 0 && !isCollapsed && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hidden lg:block">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                    {/* Show small unread count as a red circle when collapsed */}
                    {unreadCount > 0 && isCollapsed && (
                        <span className="bg-red-500 w-[10px] h-[10px] rounded-full absolute right-5 top-3">
                        </span>
                    )}
                </li>


                {/* Plus Icon */}
                <li className="w-full mb-3  hover:bg-muted p-3 rounded-md">
                    <div
                        onClick={() => onOpenChange(true)}
                        className={
                            `w-full inline-flex gap-5 items-center cursor-pointer 
                  ${isCollapsed ? "justify-center" : "justify-start"}`
                        }>
                        <FaRegPlusSquare className="text-2xl font-bold" />
                        {!isCollapsed && <span>Create</span>}
                    </div>
                </li>

                {/* User Profile Link */}
                <li className="w-full mb-3  hover:bg-muted p-3 rounded-md">
                    <Link
                        to="/account"
                        className={
                            `inline-flex w-full gap-5 items-center cursor-pointer 
                  ${isCollapsed ? "justify-center" : "justify-start"}`
                        }
                    >
                        <IoPersonSharp className="text-2xl font-bold" />
                        {!isCollapsed && <span className={pathname === '/account' ? 'font-bold' : ''}>Profile</span>}
                    </Link>
                </li>
            </ul>

            {/* Menu Button */}
            <div
                className={`flex items-end h-full w-full ${isCollapsed ? "justify-center" : "xl:justify-start lg:justify-start justify-center"
                    }`}
            >
                <div className="inline-flex items-center justify-center gap-5">
                    <Settings />
                    {!isCollapsed && <span className="font-semibold text-lg">More</span>}
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
