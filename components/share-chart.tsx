"use client";

import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TimeFrame = "daily" | "weekly" | "monthly";

interface ChartData {
  [key: string]: string | number;
}

export default function ShareChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Map the timeframe to the corresponding key used in API data
  const xKeyMapping: Record<TimeFrame, string> = {
    daily: "date",
    weekly: "week",
    monthly: "month",
  };

  useEffect(() => {
    // Fetch chart data from the API when the timeFrame changes
    const fetchChartData = async () => {
      try {
        const res = await fetch(`/api/share-chart?timeFrame=${timeFrame}`);
        const data = await res.json();
        console.log(data)
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [timeFrame]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            className={`text-sm ${
              timeFrame === "daily" ? "text-green-500 font-medium" : "text-gray-500"
            }`}
            onClick={() => setTimeFrame("daily")}
          >
            Daily
          </button>
          <button
            className={`text-sm ${
              timeFrame === "weekly" ? "text-green-500 font-medium" : "text-gray-500"
            }`}
            onClick={() => setTimeFrame("weekly")}
          >
            Weekly
          </button>
          <button
            className={`text-sm ${
              timeFrame === "monthly" ? "text-green-500 font-medium" : "text-gray-500"
            }`}
            onClick={() => setTimeFrame("monthly")}
          >
            Monthly
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-green-500"></div>
          <span className="text-xs text-gray-500">Share Chart</span>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey={xKeyMapping[timeFrame]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <YAxis
              domain={["dataMin - 5", "dataMax + 5"]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3, fill: "#22c55e" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
