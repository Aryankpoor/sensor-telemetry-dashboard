# 🏠 Smart Home IoT Telemetry Platform

<p align="center">
  <strong>A cloud-native IoT monitoring platform built with Raspberry Pi, AWS IoT Core, Lambda, DynamoDB, S3 and Next.js.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AWS-IoT%20Core-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Raspberry%20Pi-5-A22846?style=for-the-badge&logo=raspberry-pi&logoColor=white" />
  <img src="https://img.shields.io/badge/MQTT-TLS-660066?style=for-the-badge&logo=mqtt&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" />
</p>

---

## 📌 Overview

The **Smart Home IoT Telemetry Platform** is an end-to-end cloud-connected monitoring system that collects environmental data from a **DHT11 temperature and humidity sensor connected to a Raspberry Pi 5**, securely transmits the data to AWS using **MQTT over TLS**, processes it using serverless AWS services, stores both current and historical telemetry, and displays the information through a modern Next.js dashboard.

The system also implements:

- 🔐 X.509 certificate-based IoT authentication
- ☁️ AWS IoT Core MQTT ingestion
- ⚡ Serverless telemetry processing
- 🌡️ Temperature threshold monitoring
- 🚨 Automatic alert state generation
- 📊 Historical temperature and humidity graphs
- 🟢 Real-time device availability detection
- 💾 Last-known readings when the device goes offline
- 🗄️ DynamoDB current-state storage
- 📦 S3 historical telemetry storage
- 🔄 Automated AWS Backup
- 🌎 Cross-region disaster recovery
- 🚀 Vercel deployment
- 🔁 Automatic Raspberry Pi service recovery using systemd

---

# 🏗️ Architecture

```mermaid
flowchart TD

    DHT[DHT11 Sensor]

    PI[Raspberry Pi 5<br/>Python IoT Client]

    IOT[AWS IoT Core<br/>MQTT / TLS<br/>ap-south-1]

    RULE[IoT Rule]

    PROCESS[Lambda<br/>processSensorTelemetry]

    DB[(DynamoDB<br/>SensorTelemetry)]

    S3[(Amazon S3<br/>Historical Telemetry)]

    API[API Gateway<br/>SmartHomeTelemetryAPI]

    SENSOR[Lambda<br/>Sensor API]

    HISTORY[Lambda<br/>History API]

    WEB[Next.js Dashboard<br/>Vercel]

    BACKUP[AWS Backup]

    MUMBAI[Backup Vault<br/>Mumbai]

    SINGAPORE[Backup Vault<br/>Singapore]

    DHT --> PI
    PI -->|MQTT over TLS| IOT
    IOT --> RULE
    RULE --> PROCESS

    PROCESS --> DB
    PROCESS --> S3

    DB --> SENSOR
    S3 --> HISTORY

    SENSOR --> API
    HISTORY --> API

    API --> WEB

    DB --> BACKUP
    BACKUP --> MUMBAI
    MUMBAI -->|Cross-region copy| SINGAPORE