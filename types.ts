export interface DHTReading {
  temperature: number;
  humidity: number;
}

export interface SensorReadings {
  ntcTemperatures: number[];
  dht22: DHTReading;
  timestamp: Date;
}
