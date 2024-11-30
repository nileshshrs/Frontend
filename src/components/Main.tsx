import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotificationSidebar from "./NotificationSidebar";

const Main = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
    const [isSecondSidebarVisible, setSecondSidebarVisible] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1265);


    // Update isMobileView state on window resize
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

    // Handle route changes and force collapse for /messages
    useEffect(() => {
        if (location.pathname === "/messages") {
            setIsCollapsed(true);
            setSecondSidebarVisible(false);
        } else if (!isMobileView) {
            setIsCollapsed(false);
            setSecondSidebarVisible(false);
        }
    }, [location.pathname, isMobileView]);

    const toggleNavbar = () => {
        if (!isMobileView && location.pathname !== "/messages") {
            setIsCollapsed((prev) => !prev);
        }
    };

    const toggleSecondSidebar = () => {
        setSecondSidebarVisible(!isSecondSidebarVisible);
    };

    return isLoading ? (
        <div>Loading...</div>
    ) : user ? (
        <div className="flex min-h-screen relative gap-5">
            {/* Navbar (Main Sidebar) */}
            <Navbar
                isCollapsed={isMobileView || isCollapsed} // Always collapsed in mobile view
                onToggle={toggleNavbar}
                onNotificationToggle={toggleSecondSidebar}
            />

            {/* Notification Sidebar */}
            <NotificationSidebar
                isVisible={isSecondSidebarVisible}
            />

            {/* Main Content */}
            <Outlet />
        </div>
    ) : (
        <Navigate to="/sign-in" replace state={{ redirectURL: window.location.pathname }} />
    );
};

export default Main;
