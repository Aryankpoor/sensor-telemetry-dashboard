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
import { sensor } from "@/lib/mock-data"
import { HumidityChart } from "@/components/dashboard/humidity-chart"
import { TemperatureChart } from "@/components/dashboard/temperature-chart"

export default function Home() {
  const temperatureWarning =
    sensor.temperature >= sensor.temperatureThreshold

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
                SmartHome
              </h1>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              IoT monitoring dashboard
            </p>
          </div>

          <Badge variant="outline" className="gap-2 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            System Online
          </Badge>
        </header>

        <Separator className="my-8" />

        {/* Overview */}
        <section className="grid gap-4 md:grid-cols-3">

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-muted p-3">
                <Radio className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Connected Devices
                </p>
                <p className="text-2xl font-semibold">1</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-muted p-3">
                <Activity className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Sensors
                </p>
                <p className="text-2xl font-semibold">1</p>
              </div>
            </CardContent>
          </Card>

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
                    <CardTitle>{sensor.deviceName}</CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {sensor.deviceId}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Online
                </Badge>

              </div>
            </CardHeader>

            <CardContent>

              <Separator className="mb-6" />

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

                <Card className={
                  temperatureWarning
                    ? "border-destructive/50 bg-destructive/5"
                    : ""
                }>
                  <CardContent className="pt-6">

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <Thermometer className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Temperature
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

                <Card>
                  <CardContent className="pt-6">

                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-2">
                        <Droplets className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Humidity
                        </p>

                        <p className="text-3xl font-semibold">
                          {sensor.humidity}%
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      Latest reading
                    </p>

                  </CardContent>
                </Card>

              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Last updated: {sensor.lastUpdated}
                </span>

                <span className="flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5" />
                  MQTT
                </span>
              </div>

            </CardContent>
          </Card>
        </section>
        {/* Charts */}{/* Historical Data */}
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
    <TemperatureChart />
    <HumidityChart />
  </div>
</section>

      </div>
    </main>
  )
}