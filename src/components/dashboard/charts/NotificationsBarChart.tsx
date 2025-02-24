import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "../../ui/card";

const notificationsData = [
  { hour: "12 AM", likes: 15, comments: 5, follows: 3 },
  { hour: "1 AM", likes: 10, comments: 3, follows: 2 },
  { hour: "2 AM", likes: 7, comments: 2, follows: 1 },
  { hour: "3 AM", likes: 5, comments: 1, follows: 1 },
  { hour: "4 AM", likes: 4, comments: 1, follows: 1 },
  { hour: "5 AM", likes: 8, comments: 2, follows: 2 },
  { hour: "6 AM", likes: 15, comments: 5, follows: 3 },
  { hour: "7 AM", likes: 30, comments: 12, follows: 5 },
  { hour: "8 AM", likes: 50, comments: 25, follows: 10 },
  { hour: "9 AM", likes: 70, comments: 40, follows: 15 },
  { hour: "10 AM", likes: 85, comments: 50, follows: 20 },
  { hour: "11 AM", likes: 100, comments: 65, follows: 25 },
  { hour: "12 PM", likes: 130, comments: 80, follows: 35 },
  { hour: "1 PM", likes: 160, comments: 90, follows: 40 },
  { hour: "2 PM", likes: 190, comments: 110, follows: 50 },
  { hour: "3 PM", likes: 220, comments: 130, follows: 55 },
  { hour: "4 PM", likes: 250, comments: 150, follows: 60 },
  { hour: "5 PM", likes: 280, comments: 170, follows: 70 },
  { hour: "6 PM", likes: 300, comments: 180, follows: 80 },
  { hour: "7 PM", likes: 320, comments: 190, follows: 85 },
  { hour: "8 PM", likes: 340, comments: 200, follows: 90 },
  { hour: "9 PM", likes: 280, comments: 150, follows: 75 },
  { hour: "10 PM", likes: 200, comments: 100, follows: 50 },
  { hour: "11 PM", likes: 120, comments: 60, follows: 30 },
];

const NotificationsBarChart = () => {
  return (
    <Card className="w-full shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gradient-to-b dark:from-gray-900 dark:to-[#33467a] dark:bg-opacity-90 p-4">
      <CardContent className="w-full h-full">
        <h2 className="text-lg font-bold text-[#2451b7] dark:text-[#AFC8F5] mb-4">
          Notifications Over 24 Hours
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={notificationsData}
            margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
            barGap={0} // ✅ No space between Likes, Comments, Follows
            barCategoryGap="5%" // ✅ Space between each hour
          >
            <CartesianGrid stroke="rgba(36, 81, 183, 0.15)" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fill: "#2451b7", fontSize: 12, fontWeight: "bold" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Time (Hours)",
                position: "insideBottom",
                offset: -5,
                fill: "#2451b7",
                fontSize: 14,
                fontWeight: "bold",
              }}
            />
            <YAxis
              tick={{ fill: "#2451b7", fontSize: 12, fontWeight: "bold" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Notification Count",
                angle: -90,
                position: "insideLeft",
                fill: "#2451b7",
                fontSize: 14,
                fontWeight: "bold",
              }}
            />
            <Tooltip
              formatter={(value, name) => [`${value} ${name}`, name]}
              contentStyle={{
                backgroundColor: "#ffffff",
                color: "#2451b7",
                borderRadius: "8px",
                border: `1px solid #2451b7`,
              }}
              itemStyle={{ fontWeight: "bold" }}
              cursor={false}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: "#2451b7", fontSize: 14, fontWeight: "bold" }} />
            <Bar dataKey="likes" name="Likes" fill="#4F46E5" />
            <Bar dataKey="comments" name="Comments" fill="#F97316" />
            <Bar dataKey="follows" name="Follows" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NotificationsBarChart;
