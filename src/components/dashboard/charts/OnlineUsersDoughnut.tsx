import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, TooltipProps } from "recharts";

// Define the data structure for our device data
interface DeviceData {
  name: string;
  value: number;
}

const data: DeviceData[] = [
  { name: "Online Users", value: 2050000000 },
  { name: "Offline Users", value: 450000000 },
];

const PRIMARY_COLOR = "#2451b7"; // Matches Chart Primary Color
const DARK_PRIMARY_COLOR = "#AFC8F5"; // Light Blue for Dark Mode
const COLORS = ["#34D399", "#9CA3AF"]; // Green for online, Gray for offline

// Define type for our custom tooltip props using Recharts' TooltipProps
interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-blue-500 dark:border-gray-600 p-2 rounded-lg shadow-md">
        <p className="text-blue-700 dark:text-blue-400 font-semibold">{`User: ${label}`}</p>
        <p className="text-blue-700 dark:text-blue-400">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const OnlineUsersDoughnut: React.FC = () => {
  return (
    <div className="w-full lg:w-[500px] h-[400px] shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 
      dark:bg-gradient-to-b dark:from-gray-900 dark:to-[#29385f] dark:bg-opacity-90 
      flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold text-[#2451b7] dark:text-[#AFC8F5] mb-2">
        Current Online Users
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
            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${(value / 1000000).toFixed(0)}M`}
            contentStyle={{
              backgroundColor: "#ffffff",
              color: PRIMARY_COLOR,
              borderRadius: "8px",
              border: `1px solid ${PRIMARY_COLOR}`,
            }}
            itemStyle={{ color: PRIMARY_COLOR, fontWeight: "bold" }}
            cursor={false}
          />
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

export default OnlineUsersDoughnut;
