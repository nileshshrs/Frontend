import { FaBell } from "react-icons/fa"; // Example notification icon
import { Input } from "./ui/input";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/api";
import { useNotifications } from "../hooks/useNotifications";
import { Link } from "react-router-dom";

const ResponsiveNavbar = ({ toggleResponsiveNotification }: any) => {  // Accept the prop

    const { theme } = useTheme();
    const [searchText, setSearchText] = useState(""); // Track search input
    const [isSearchActive, setIsSearchActive] = useState(false); // Track search bar state
    const [isSticky, setIsSticky] = useState(false); // Track whether the navbar should be sticky
    const { unreadCount } = useNotifications()
    const shutter = theme === 'light' ? '/image/shutter-dark.png' : '/image/shutter-light.png';

    // Fetching users data
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["search_users"],
        queryFn: getAllUsers,
    });

    // Handle input changes and update the state
    const handleSearchChange = (e: any) => {
        const value = e.target.value;
        setSearchText(value);
        setIsSearchActive(value.length > 0); // Show the dropdown when text is entered
    };

    // Filter users based on the search text
    const filteredUsers = users.filter((user: any) => {
        return user.username.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase());
    });

    // Handle scroll event to set sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setIsSticky(true); // Make navbar sticky after scroll
            } else {
                setIsSticky(false); // Reset when scrolling back up
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`flex items-center justify-between p-4 ${isSticky ? "fixed top-0 left-0 w-full z-20 bg-background shadow-md transition-all duration-300" : ""}`}
            style={{ transition: 'all 0.3s ease' }}
        >
            {/* Logo */}
            <div className="flex items-center space-x-2">
               <Link to="/"> <img src={shutter} className="w-[40px]" /></Link>
            </div>

            {/* Search Bar */}
            <div className="relative flex-grow mx-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 rounded-lg text-black"
                    value={searchText}
                    onChange={handleSearchChange}
                />

                {/* Search Suggestions/Dropdown */}
                {isSearchActive && (
                    <div className="absolute left-0 right-0 top-full mt-1 p-2 bg-background shadow-md rounded-lg z-10">
                        {isLoading ? (
                            <div>Loading...</div> // Show loading state while fetching users
                        ) : filteredUsers.length > 0 ? (
                            <ul>
                                {filteredUsers.map((user: any) => (
                                    <li key={user?._id} className="p-2 hover:bg-muted cursor-pointer flex items-center space-x-2">
                                        {/* User image */}
                                        <img src={user?.image || "/default-avatar.png"} alt={user?.username} className="w-8 h-8 rounded-full" />
                                        <div>
                                            <div>{user?.username}</div>
                                            <div className="text-sm text-gray-500">{user?.email}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>No users found</div> // Display message if no users match the search text
                        )}
                    </div>
                )}
            </div>

            {/* Notification Icon */}
            <div className="flex items-center">
                <button className="relative" onClick={toggleResponsiveNotification}> {/* Add the click handler */}
                    <FaBell className="text-xl" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full h-[5px] w-[5px]"></span> 
                    )}
                </button>
            </div>
        </div>
    );
};

export default ResponsiveNavbar;
