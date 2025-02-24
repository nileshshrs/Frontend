import React from "react";
import TotalUsersCard from "./cards/TotalUserCard";
import TotalMessagesCard from "./cards/TotalMessagesCard";
import TotalPostsCard from "./cards/TotalPostsCard";
import TotalCommentsCard from "./cards/TotalCommentsCard";
import HealthAreaChart from "./charts/HealthAreaChart";
import OnlineUsersDoughnut from "./charts/OnlineUsersDoughnut";
import NotificationsBarChart from "./charts/NotificationsBarChart";
import UserDevicesPieChart from "./charts/UserDevicesPieChart";
import NetworkTrafficLineChart from "./charts/NetworkTrafficLineChart";

const Dashboard = () => {
  return (
    <div className="p-5 w-full">
      {/* Grid Layout with Responsive Adjustments */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <TotalUsersCard />
        <TotalMessagesCard />
        <TotalPostsCard />
        <TotalCommentsCard />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-6">
        <HealthAreaChart />
        <OnlineUsersDoughnut />
      </div>
      <div className="mt-6">
        <NotificationsBarChart />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-6">
        <UserDevicesPieChart />
        <NetworkTrafficLineChart />
      </div>

    </div>
  );
};

export default Dashboard;
