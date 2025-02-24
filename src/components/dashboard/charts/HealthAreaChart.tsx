import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, TooltipProps } from "recharts";
import { Card, CardContent } from "../../ui/card";

// Define the shape of each data item
interface PlatformHealthData {
  week: number;
  health: number;
}

// Our data array with type safety
const platformHealthData: PlatformHealthData[] = [
  { week: 0, health: 10 },
  { week: 1, health: 38 },
  { week: 2, health: 41 },
  { week: 3, health: 50 },
  { week: 4, health: 59 },
  { week: 5, health: 55 },
  { week: 6, health: 70 },
  { week: 7, health: 67 },
  { week: 8, health: 67 },
  { week: 9, health: 49 },
  { week: 10, health: 30 },
  { week: 11, health: 40 },
  { week: 12, health: 35 },
  { week: 13, health: 35 },
  { week: 14, health: 20 },
  { week: 15, health: 28 },
  { week: 16, health: 30 },
  { week: 17, health: 32 },
  { week: 18, health: 35 },
  { week: 19, health: 40 },
  { week: 20, health: 60 },
  { week: 21, health: 62 },
  { week: 22, health: 59 },
  { week: 23, health: 40 },
  { week: 24, health: 48 },
  { week: 25, health: 78 }
];

// Define the props for the custom tooltip
interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-blue-500 dark:border-gray-600 p-2 rounded-lg shadow-md">
        <p className="text-blue-700 dark:text-blue-400 font-semibold">{`Week: ${label}`}</p>
        <p className="text-blue-700 dark:text-blue-400">{`Active Users: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const HealthAreaChart: React.FC = () => {
  return (
    <Card className="w-full min-w-[350px] shadow-lg px-0 rounded-lg p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-[400px]">
      <CardContent className="w-full h-full px-0">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
          Platform Overview
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={platformHealthData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451b7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2451b7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(36, 81, 183, 0.15)" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: "#2451b7", fontSize: 12, fontWeight: "bold" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Weeks",
                position: "insideBottom",
                offset: -5,
                fill: "#2451b7",
                fontSize: 14,
                fontWeight: "bold"
              }}
            />
            <YAxis
              domain={[0, 80]}
              tick={{ fill: "#2451b7", fontSize: 12, fontWeight: "bold" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Active Users",
                angle: -90,
                position: "insideLeft",
                fill: "#2451b7",
                fontSize: 14,
                fontWeight: "bold"
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ color: "#2451b7", fontSize: 14, fontWeight: "bold" }}
            />
            <Area
              type="linear"
              dataKey="health"
              name="Active Users (%)"
              stroke="#2451b7"
              fill="url(#colorHealth)"
              strokeWidth={4}
              activeDot={{ r: 6 }}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HealthAreaChart;
