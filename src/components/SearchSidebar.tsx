import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/api";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loader from "./utils/Loader";
import { User } from "../utils/types";

interface NotificationSidebarProps {
    isVisible: boolean;
}

const SearchSidebar = ({ isVisible }: NotificationSidebarProps) => {
    const { data: users, isLoading } = useQuery({
        queryKey: ["search_users"],
        queryFn: getAllUsers,
    });

    const location = useLocation();
    const pathname = location.pathname;

    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1265);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter users based on search term
    const filteredUsers = users?.filter((user: any) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if we're on the /messages route
    const isMessagesPage = pathname.startsWith("/messages");

    // Update isMobileView on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1265);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            className={`transition-all duration-300 min-w-[400px] min-h-screen bg-background border-r z-10
        ${isMobileView
                    ? !isVisible
                        ? "fixed -translate-x-full -z-10"
                        : "fixed top-0 left-[70px]"
                    : !isVisible
                        ? "fixed -translate-x-full -z-10"
                        : "translate-x-0"
                } 
        ${!isMobileView && isMessagesPage ? "fixed top-0 left-[70px]" : ""}`}
        >
            <div className="border-b">
                <div className="p-5 grid gap-3 relative">
                    <h2 className="text-2xl font-semibold">Search</h2>
                    <div className="relative">
                        <Input
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-muted-foreground"
                                onClick={() => setSearchTerm("")}
                            >
                                <IoIosCloseCircleOutline className="text-xl" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                {isLoading ? (
                    <div className="text-center text-sm text-muted-foreground">
                        <Loader />
                    </div>
                ) : searchTerm ? (
                    filteredUsers && filteredUsers.length > 0 ? (
                        <div className="space-y-3">
                            {filteredUsers.map((user: User) => (
                                <Link to={`/profile/${user._id}`}
                                    key={user._id}
                                    className="flex items-center gap-3 p-3 hover:bg-muted"
                                >
                                    <img
                                        src={
                                            user.image ||
                                            "https://avatars.pfptown.com/020/anime-girl-pfp-995.png"
                                        }
                                        alt={user.username}
                                        className="w-[45px] h-[45px] rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">{user.username}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-sm text-muted-foreground">
                            No users found
                        </div>
                    )
                ) : (
                    <div className="text-center text-sm text-muted-foreground min-h-[500px] flex items-center justify-center">
                        No recent searches
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchSidebar;
