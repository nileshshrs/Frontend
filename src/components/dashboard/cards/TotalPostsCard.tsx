import React from "react";
import { Card, CardContent } from "../../ui/card";
import { FileText } from "lucide-react";

const TotalPostsCard = () => {
  return (
    <Card className="w-full sm:min-w-[350px] md:min-w-0 h-44 flex flex-col justify-center shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 
      bg-gradient-to-b from-green-400 to-green-500 dark:bg-gradient-to-b dark:from-green-500 dark:to-green-700 p-6">
      <CardContent className="text-left">
        <div className="inline-flex items-center gap-3">
          <FileText className="text-white w-8 h-8" />
          <h2 className="text-xl font-extrabold text-white">Posts</h2>
        </div>
        <p className="text-3xl font-semibold text-white mt-2">752,139</p>
      </CardContent>
    </Card>
  );
};

export default TotalPostsCard;
