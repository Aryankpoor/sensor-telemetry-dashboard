export interface SensorReading {
  deviceId: string
  sensorId: string
  sensorType: string
  timestamp: string
  temperature: number
  humidity: number
}

export interface Sensor {
  deviceId: string
  deviceName: string
  sensorId: string
  sensorType: string
  status: "online" | "offline"
  temperature: number
  humidity: number
  temperatureThreshold: number
  lastUpdated: string
}