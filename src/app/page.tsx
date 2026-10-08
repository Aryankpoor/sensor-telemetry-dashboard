import {
  Activity,
  Cpu,
  Droplets,
  Gauge,
  Radio,
  Thermometer,
  Wifi,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { getSensor, getSensorHistory } from "@/lib/api"

import { HumidityChart } from "@/components/dashboard/humidity-chart"
import { TemperatureChart } from "@/components/dashboard/temperature-chart"

export default async function Home() {
  // Get current sensor state from DynamoDB through API Gateway
  const sensor = await getSensor("home-pi-001")

  // Get historical telemetry from S3 through API Gateway
  const readings = await getSensorHistory(
    sensor.deviceId,
    sensor.sensorId
  )

  // Alert is determined by AWS Lambda
  const temperatureWarning = sensor.alert

  // Device availability is determined by the Sensor API Lambda
  const isOnline = sensor.status === "online"

  // We are intentionally assuming one Raspberry Pi.
  const connectedDevices = isOnline ? 1 : 0

  // One active sensor while the Pi is online.
  const activeSensors = isOnline ? 1 : 0

  // Format timestamp into a human-friendly date and time
  const formattedLastUpdated = new Date(
    sensor.lastUpdated
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary p-2 text-primary-foreground">
                <Cpu className="h-5 w-5" />
              </div>

              <h1 className="text-2xl font-semibold tracking-tight">
                Remote Monitoring Dashboard
              </h1>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Telemetry
            </p>
          </div>

          <Badge
            variant="outline"
            className={`gap-2 px-3 py-1.5 ${
              isOnline
                ? "border-emerald-500/50 text-emerald-600"
                : "border-red-500/50 text-red-600"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline ? "bg-emerald-500" : "bg-red-500"
              }`}
            />

            {isOnline ? "System Online" : "System Offline"}
          </Badge>
        </header>

        <Separator className="my-8" />

        {/* Overview */}
        <section className="grid gap-4 md:grid-cols-3">

          {/* Connected Devices */}
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-muted p-3">
                <Radio className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Connected Devices
                </p>

                <p className="text-2xl font-semibold">
                  {connectedDevices}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Sensors */}
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-muted p-3">
                <Activity className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Sensors
                </p>

                <p className="text-2xl font-semibold">
                  {activeSensors}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Warnings */}
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-muted p-3">
                <Gauge className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Warnings
                </p>

                <p className="text-2xl font-semibold">
                  {temperatureWarning ? "1" : "0"}
                </p>
              </div>
            </CardContent>
          </Card>

        </section>

        {/* Device */}
        <section className="mt-8">

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Devices
            </h2>

            <p className="text-sm text-muted-foreground">
              Connected smart-home hardware
            </p>
          </div>

          <Card>

            <CardHeader>
              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-muted p-3">
                    <Cpu className="h-6 w-6" />
                  </div>

                  <div>
                    <CardTitle>
                      {sensor.deviceName}
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {sensor.deviceId}
                    </p>
                  </div>

                </div>

                {/* Device status */}
                <Badge
                  variant="outline"
                  className={`gap-2 ${
                    isOnline
                      ? "border-emerald-500/50 text-emerald-600"
                      : "border-red-500/50 text-red-600"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOnline ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />

                  {isOnline ? "Online" : "Offline"}
                </Badge>

              </div>
            </CardHeader>

            <CardContent>

              <Separator className="mb-6" />

              {/* Offline notice */}
              {!isOnline && (
                <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
                  <p className="text-sm font-medium text-red-600">
                    Device is offline
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Showing the last recorded temperature and humidity.
                  </p>
                </div>
              )}

              {/* Sensor */}
              <div className="mb-5 flex items-center justify-between">

                <div>
                  <p className="font-medium">
                    {sensor.sensorType} Sensor
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {sensor.sensorId}
                  </p>
                </div>

                <Badge variant="secondary">
                  Temperature + Humidity
                </Badge>

              </div>

              {/* Readings */}
              <div className="grid gap-4 md:grid-cols-2">

                {/* Temperature */}
                <Card
                  className={
                    temperatureWarning
                      ? "border-destructive/50 bg-destructive/5"
                      : ""
                  }
                >

                  <CardContent className="pt-6">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-muted p-2">
                          <Thermometer className="h-5 w-5" />
                        </div>

                        <div>

                          <p className="text-sm text-muted-foreground">
                            {isOnline
                              ? "Temperature"
                              : "Last Temperature"}
                          </p>

                          <p className="text-3xl font-semibold">
                            {sensor.temperature}°C
                          </p>

                        </div>

                      </div>

                      {temperatureWarning && (
                        <Badge variant="destructive">
                          ⚠ High
                        </Badge>
                      )}

                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      Threshold: {sensor.temperatureThreshold}°C
                    </p>

                  </CardContent>

                </Card>

                {/* Humidity */}
                <Card>

                  <CardContent className="pt-6">

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-muted p-2">
                        <Droplets className="h-5 w-5" />
                      </div>

                      <div>

                        <p className="text-sm text-muted-foreground">
                          {isOnline
                            ? "Humidity"
                            : "Last Humidity"}
                        </p>

                        <p className="text-3xl font-semibold">
                          {sensor.humidity}%
                        </p>

                      </div>

                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      {isOnline
                        ? "Latest reading"
                        : "Last recorded reading"}
                    </p>

                  </CardContent>

                </Card>

              </div>

              {/* Footer */}
              <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">

                <span>
                  Last reading: {formattedLastUpdated}
                </span>

                <span className="flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5" />
                  MQTT
                </span>

              </div>

            </CardContent>

          </Card>

        </section>

        {/* Historical Data */}
        <section className="mt-8">

          <div className="mb-4">

            <h2 className="text-lg font-semibold">
              Historical Data
            </h2>

            <p className="text-sm text-muted-foreground">
              Recent sensor telemetry
            </p>

          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            <TemperatureChart
              readings={readings}
            />

            <HumidityChart
              readings={readings}
            />

          </div>

        </section>

      </div>
    </main>
  )
}