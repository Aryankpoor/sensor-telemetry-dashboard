"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { readings } from "@/lib/mock-data"

export function HumidityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Humidity History
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Recent humidity readings from the DHT11 sensor
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={readings}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />

              <YAxis
                domain={["dataMin - 2", "dataMax + 2"]}
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                }}
                formatter={(value) => [`${value}%`, "Humidity"]}
              />

              <Line
                type="monotone"
                dataKey="humidity"
                stroke="currentColor"
                className="text-foreground"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}