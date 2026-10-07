import { Sensor, SensorReading } from "@/types/sensor"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getSensor(deviceId: string): Promise<Sensor> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured")
  }

  const response = await fetch(
    `${API_URL}/sensor/${encodeURIComponent(deviceId)}`,
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch sensor: ${response.status}`)
  }

  return response.json()
}

export async function getSensorHistory(
  deviceId: string,
  sensorId: string
): Promise<SensorReading[]> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured")
  }

  const response = await fetch(
    `${API_URL}/history/${encodeURIComponent(deviceId)}/${encodeURIComponent(sensorId)}`,
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch sensor history: ${response.status}`)
  }

  const data = await response.json()

  return data.readings
}