import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

interface NotificationSidebarProps {
    isVisible: boolean;
}

const SearchSidebar = ({ isVisible }:NotificationSidebarProps) => {

    const location = useLocation();
    const pathname = location.pathname;

    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1265);

    // Check if we're on the /messages route
    const isMessagesPage = pathname === "/messages" ;

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
    className={`transition-all duration-300 min-w-[400px] min-h-screen bg-background
        ${isMobileView
            ? !isVisible ? "fixed -translate-x-full -z-10" : "fixed top-0 left-[70px]"
            : !isVisible
                ? "fixed -translate-x-full -z-10"
                : "translate-x-0"
        } 
        ${!isMobileView && isMessagesPage ? "fixed top-0 left-[70px]" : ""} 
    `}
>
    <h2 className="text-xl">Search</h2>
    <p className="">Here are your searches...</p>
</div>
  )
}

export default SearchSidebar