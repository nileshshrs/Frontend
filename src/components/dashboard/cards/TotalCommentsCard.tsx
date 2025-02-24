import React from "react";
import { Card, CardContent } from "../../ui/card";
import { MessageSquare } from "lucide-react";

const TotalCommentsCard = () => {
  return (
    <Card className="w-full sm:min-w-[350px] md:min-w-0 h-44 flex flex-col justify-center shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 
      bg-gradient-to-b from-red-400 to-red-500 dark:bg-gradient-to-b dark:from-red-500 dark:to-red-700 p-6">
      <CardContent className="text-left">
        <div className="inline-flex items-center gap-3">
          <MessageSquare className="text-white w-8 h-8" />
          <h2 className="text-xl font-extrabold text-white">Comments</h2>
        </div>
        <p className="text-3xl font-semibold text-white mt-2">1,482,573</p>
      </CardContent>
    </Card>
  );
};

export default TotalCommentsCard;
