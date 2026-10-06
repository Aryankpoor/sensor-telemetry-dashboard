import { Sensor, SensorReading } from "@/types/sensor"

export const temperatureThreshold = 30

export const sensor: Sensor = {
  deviceId: "home-pi-001",
  deviceName: "Raspberry Pi 5",
  sensorId: "dht11-001",
  sensorType: "DHT11",
  status: "online",
  temperature: 28.4,
  humidity: 67,
  temperatureThreshold,
  lastUpdated: "Just now",
}

export const readings: SensorReading[] = [
  {
    deviceId: "home-pi-001",
    sensorId: "dht11-001",
    sensorType: "DHT11",
    timestamp: "18:00",
    temperature: 27.2,
    humidity: 69,
  },
  {
    deviceId: "home-pi-001",
    sensorId: "dht11-001",
    sensorType: "DHT11",
    timestamp: "18:05",
    temperature: 27.6,
    humidity: 68,
  },
  {
    deviceId: "home-pi-001",
    sensorId: "dht11-001",
    sensorType: "DHT11",
    timestamp: "18:10",
    temperature: 28.1,
    humidity: 67,
  },
  {
    deviceId: "home-pi-001",
    sensorId: "dht11-001",
    sensorType: "DHT11",
    timestamp: "18:15",
    temperature: 28.8,
    humidity: 66,
  },
  {
    deviceId: "home-pi-001",
    sensorId: "dht11-001",
    sensorType: "DHT11",
    timestamp: "18:20",
    temperature: 29.2,
    humidity: 66,
  },
  {
    deviceId: "home-pi-001",
    sensorId: "dht11-001",
    sensorType: "DHT11",
    timestamp: "18:25",
    temperature: 28.7,
    humidity: 67,
  },
  {
    deviceId: "home-pi-001",
    sensorId: "dht11-001",
    sensorType: "DHT11",
    timestamp: "18:30",
    temperature: 28.4,
    humidity: 67,
  },
]