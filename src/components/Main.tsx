import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotificationSidebar from "./NotificationSidebar";
import { useAuthContext } from "../context/AuthContext";
import SearchSidebar from "./SearchSidebar";
import CreatePosts from "./posts/CreatePosts";


const Main = () => {

    const { user } = useAuthContext();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
    const [isSecondSidebarVisible, setSecondSidebarVisible] = useState(false);
    const [isSearchSidebarVisible, setSearchSidebarVisible] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1265);
    const [isCreate, setIsCreate] = useState(false);

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
        if (location.pathname.startsWith("/messages")) {
            setIsCollapsed(true);
            setSecondSidebarVisible(false);
            setSearchSidebarVisible(false);
        } else if (!isMobileView) {
            setIsCollapsed(false);
            setSecondSidebarVisible(false);
            setSearchSidebarVisible(false);
        }
    }, [location.pathname, isMobileView]);

    const toggleNavbar = () => {
        if (!isMobileView && location.pathname !== "/messages") {
            setIsCollapsed((prev) => !prev);
        }
    };

    const toggleSecondSidebar = () => {
        setSecondSidebarVisible(!isSecondSidebarVisible);
        setSearchSidebarVisible(false)
    };

    const toggleSearchSidebar = () => {
        setSearchSidebarVisible(!isSearchSidebarVisible);
        setSecondSidebarVisible(false); // Close notifications if search is toggled
    };

    return user ? (
        <div className={`flex min-h-screen relative ${location.pathname.startsWith("/message") ? "gap-0" : "gap-0"}`}>
            {/* Navbar (Main Sidebar) */}
            <Navbar
                isCollapsed={isMobileView || isCollapsed || isSecondSidebarVisible || isSearchSidebarVisible}// Always collapsed in mobile view
                onToggle={toggleNavbar}
                onNotificationToggle={toggleSecondSidebar}
                onSearchToggle={toggleSearchSidebar}
                setCollapsed={setIsCollapsed}
                onOpenChange={setIsCreate}
            />

            {/* Notification Sidebar */}
            <NotificationSidebar isVisible={isSecondSidebarVisible} />
            {/*Search Sidebar */}
            <SearchSidebar isVisible={isSearchSidebarVisible} />

            {/* Main Content */}
            <div className="w-full">
                <Outlet />
                <CreatePosts isOpen={isCreate} onOpenChange={setIsCreate} />
            </div>
        </div>
    ) : (
        <Navigate to="/sign-in" replace state={{ redirectURL: window.location.pathname }} />
    );
};

export default Main;
