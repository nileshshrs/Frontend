import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Mobile", value: 82 },  // Mobile users are more
  { name: "Desktop", value: 15 },
  { name: "Tablet", value: 3 },
];

const PRIMARY_COLOR = "#2451b7"; // Matches Chart Primary Color
// const DARK_PRIMARY_COLOR = "#AFC8F5"; // Light Blue for Dark Mode
const COLORS = ["#34D399", "#4F46E5", "#F97316"]; // Green for mobile, Blue for desktop, Orange for tablet

const UserDevicesPieChart = () => {
  return (
    <div className="w-full lg:w-[500px] h-[400px] shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 
        dark:bg-gradient-to-b dark:from-gray-900 dark:to-[#29385f] dark:bg-opacity-90 
        flex flex-col justify-center items-center">
      {/* THEMED TITLE - MATCHES CHART COLOR */}
      <h2 className="text-lg font-bold text-[#2451b7] dark:text-[#AFC8F5] mb-2">
        User Devices Distribution
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={130}
            fill={PRIMARY_COLOR}
            paddingAngle={3}
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(1)}%`} // Keeps percentage labels inside
            labelLine={false} // Removes tick lines
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          {/* THEMED TOOLTIP */}
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{
              backgroundColor: "#ffffff", // Light mode tooltip
              color: PRIMARY_COLOR,
              borderRadius: "8px",
              border: `1px solid ${PRIMARY_COLOR}`,
            }}
            itemStyle={{ color: PRIMARY_COLOR, fontWeight: "bold" }}
            cursor={false}
          />

          {/* THEMED LEGEND */}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              color: PRIMARY_COLOR,
              fontSize: "14px",
              fontWeight: "bold",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDevicesPieChart;
