import React from "react";
import { Card, CardContent } from "../../ui/card";
import { UserRound } from "lucide-react";

const TotalUsersCard = () => {
  return (
    <Card className="w-full sm:min-w-[350px] md:min-w-0 h-44 flex flex-col justify-center shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 
      bg-gradient-to-b from-blue-400 to-blue-500 dark:bg-gradient-to-b dark:from-blue-500 dark:to-blue-700 p-6">
      <CardContent className="text-left">
        <div className="inline-flex items-center gap-3">
          <UserRound className="text-white w-8 h-8" />
          <h2 className="text-xl font-extrabold text-white">Users</h2>
        </div>
        <p className="text-3xl font-semibold text-white mt-2">150,432</p>
      </CardContent>
    </Card>
  );
};

export default TotalUsersCard;
