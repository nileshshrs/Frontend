import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSocketContext } from "../context/SocketContext";
import { queryClient } from "../main";
import { useNotifications } from "../hooks/useNotifications";
import { updateNotifications } from "../api/api";
import { formatTimeAgo } from "../utils/formatTimeAgo";

interface NotificationSidebarProps {
    isVisible: boolean;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isVisible }) => {
    const { socket } = useSocketContext();
    const location = useLocation();
    const pathname = location.pathname;
    const { notifications, isLoading } = useNotifications()

    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1265);

    // Check if we're on the /messages route
    const isMessagesPage = pathname.startsWith("/messages");

    useEffect(() => {
        if (!socket) return;
        socket.on("notification", (data: string) => {
            queryClient.invalidateQueries(['notifications'])

        })
    })
    useEffect(() => {
        updateNotifications()
        queryClient.invalidateQueries(['notifications'])
    }, [isVisible]);

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

    if (isLoading) {
        return null;
    }

    const getNotificationMessage = (type: string) => {
        switch (type) {
            case 'follow':
                return "has started to follow you";
            case 'like':
                return "liked your post";
            case 'comment':
                return "commented on your post";
            default:
                return "sent you a notification";
        }
    };

    return (
        <div
            className={`transition-all duration-300 min-w-[400px] min-h-screen bg-background border-r z-10
                ${isMobileView
                    ? !isVisible ? "fixed -translate-x-full -z-10" : "fixed top-0 left-[70px]"
                    : !isVisible
                        ? "fixed -translate-x-full -z-10"
                        : "translate-x-0"
                } 
                ${!isMobileView && isMessagesPage ? "fixed top-0 left-[70px]" : ""} 
            `}
        >
            <h2 className="text-xl px-5 font-bold py-5">Notifications</h2>
            <div className="py-5">
                {/* Check if there are notifications */}
                {notifications?.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground">
                        You have no notifications as of now.
                    </div>
                ) : (
                    <div className="overflow-y-scroll max-h-[calc(100vh-100px)]" style={{
                        scrollbarWidth: "none", // For Firefox
                        msOverflowStyle: "none",
                    }}> {/* This ensures scrolling for the notifications */}
                        {notifications.map((notification: any) => (
                            <div key={notification._id} className="notification-item p-5 hover:bg-muted ">
                                <Link to={`/profile/${notification.sender._id}`}>
                                    <div className="inline-flex items-center justify-between gap-5">
                                        <div>
                                            <img src={notification.sender?.image[0]} alt="" className="w-[40px] h-[40px] rounded-full" />
                                        </div>
                                        <div className="font-light">
                                            <span className="font-normal">{notification.sender?.username || "Unknown Sender"}{" "}</span>
                                            {getNotificationMessage(notification.type)}.
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {formatTimeAgo(notification.createdAt)}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationSidebar;
