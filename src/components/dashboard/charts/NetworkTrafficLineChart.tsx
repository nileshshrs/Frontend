import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "../../ui/card";

const networkData = [
  { time: "12 AM", download: 250, upload: 80, responseTime: 150 },
  { time: "1 AM", download: 234, upload: 110, responseTime: 129 },
  { time: "2 AM", download: 240, upload: 130, responseTime: 120 },
  { time: "3 AM", download: 238, upload: 150, responseTime: 80 },
  { time: "4 AM", download: 210, upload: 170, responseTime: 38 },
  { time: "5 AM", download: 180, upload: 190, responseTime: 40 },
  { time: "6 AM", download: 170, upload: 210, responseTime: 42 },
  { time: "7 AM", download: 165, upload: 260, responseTime: 70 },
  { time: "8 AM", download: 160, upload: 270, responseTime: 60 },
  { time: "9 AM", download: 160, upload: 290, responseTime: 60 },
  { time: "10 AM", download: 185, upload: 310, responseTime: 70 },
  { time: "11 AM", download: 200, upload: 330, responseTime: 55 },
  { time: "12 PM", download: 220, upload: 350, responseTime: 58 },
  { time: "1 PM", download: 410, upload: 370, responseTime: 130 },
  { time: "2 PM", download: 480, upload: 390, responseTime: 128 },
  { time: "3 PM", download: 470, upload: 410, responseTime: 66 },
  { time: "4 PM", download: 450, upload: 430, responseTime: 70 },
  { time: "5 PM", download: 450, upload: 450, responseTime: 70 },
  { time: "6 PM", download: 500, upload: 460, responseTime: 150 },
  { time: "7 PM", download: 430, upload: 480, responseTime: 75 },
  { time: "8 PM", download: 440, upload: 500, responseTime: 77 },
  { time: "9 PM", download: 440, upload: 480, responseTime: 80 },
  { time: "10 PM", download: 420, upload: 460, responseTime: 82 },
  { time: "11 PM", download: 350, upload: 440, responseTime: 30 }
];

const PRIMARY_COLOR = "#2451b7";

const NetworkTrafficLineChart = () => {
  return (
    <Card className="w-full min-w-[350px]  shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-[400px]">
      <CardContent className="w-full h-full">
        <h2 className="text-lg font-bold text-[#2451b7] dark:text-[#AFC8F5] mb-2">
          Network Traffic (Download, Upload, & Response Time)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={networkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="rgba(36, 81, 183, 0.15)" vertical={false} />
            <XAxis 
              dataKey="time"
              tick={{ fill: PRIMARY_COLOR, fontSize: 12, fontWeight: "bold" }}
              axisLine={false}
              label={{
                value: "Time (Hours)",
                position: "insideBottom",
                offset: -5,
                fill: PRIMARY_COLOR,
                fontSize: 14,
                fontWeight: "bold"
              }}
            />
            <YAxis 
              tick={{ fill: PRIMARY_COLOR, fontSize: 12, fontWeight: "bold" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Traffic / Response",
                angle: -90,
                position: "insideLeft",
                fill: PRIMARY_COLOR,
                fontSize: 14,
                fontWeight: "bold"
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#ffffff",
                color: PRIMARY_COLOR,
                borderRadius: "8px",
                border: `1px solid ${PRIMARY_COLOR}`
              }}
              itemStyle={{ fontWeight: "bold" }}
              cursor={false}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: PRIMARY_COLOR, fontSize: 14, fontWeight: "bold" }} />
            <Line 
              type="monotone" 
              dataKey="download" 
              name="Download Traffic" 
              stroke="#34D399" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 12, fill: "#34D399" }}
            />
            <Line 
              type="monotone" 
              dataKey="upload" 
              name="Upload Traffic" 
              stroke="#4F46E5" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 12, fill: "#4F46E5" }}
            />
            <Line 
              type="monotone" 
              dataKey="responseTime" 
              name="Response Time" 
              stroke="#F97316" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 12, fill: "#F97316" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NetworkTrafficLineChart;
