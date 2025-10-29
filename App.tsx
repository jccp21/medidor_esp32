import React, { useState, useEffect, useCallback } from 'react';
import { type SensorReadings } from './types';
import HistoryChart from './components/HistoryChart';
import StatusIndicator from './components/StatusIndicator';
import SensorCard from './components/SensorCard';

const MAX_HISTORY_LENGTH = 30;
const SIMULATION_INTERVAL_MS = 3000;

const App: React.FC = () => {
  const [currentReading, setCurrentReading] = useState<SensorReadings | null>(null);
  const [history, setHistory] = useState<SensorReadings[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  const simulateDataFetch = useCallback(() => {
    const newNtcTemperatures = Array.from({ length: 6 }, () => {
      const baseline = 21;
      const fluctuation = (Math.random() - 0.5) * 3;
      return parseFloat((baseline + fluctuation).toFixed(2));
    });

    const dhtBaselineTemp = 22.5;
    const dhtFluctuation = (Math.random() - 0.5) * 2;
    const newDhtTemperature = parseFloat((dhtBaselineTemp + dhtFluctuation).toFixed(2));

    const humidityBaseline = 55;
    const humidityFluctuation = (Math.random() - 0.5) * 10;
    const newHumidity = parseFloat((humidityBaseline + humidityFluctuation).toFixed(2));

    const newReading: SensorReadings = {
      ntcTemperatures: newNtcTemperatures,
      dht22: {
        temperature: newDhtTemperature,
        humidity: newHumidity,
      },
      timestamp: new Date(),
    };

    setCurrentReading(newReading);
    setHistory(prevHistory => {
      const updatedHistory = [...prevHistory, newReading];
      if (updatedHistory.length > MAX_HISTORY_LENGTH) {
        return updatedHistory.slice(updatedHistory.length - MAX_HISTORY_LENGTH);
      }
      return updatedHistory;
    });
  }, []);
  
  useEffect(() => {
    // Initial data point
    simulateDataFetch();
    
    const intervalId = setInterval(simulateDataFetch, SIMULATION_INTERVAL_MS);
    
    // Simulate connection drops occasionally
    const connectionInterval = setInterval(() => {
      setIsConnected(Math.random() > 0.1); // 10% chance to disconnect
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearInterval(connectionInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-base-dark text-white font-sans flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-accent-cyan tracking-wider">
            Multi-Sensor Monitor
          </h1>
          <p className="text-gray-400 mt-2">Real-time data from ESP32 with 6 NTCs &amp; 1 DHT22</p>
        </header>

        <main className="space-y-8">
          <section className="bg-primary-dark p-6 rounded-2xl shadow-lg border border-secondary-dark">
              <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <h2 className="text-2xl font-bold text-gray-300">Sensor Readings</h2>
                  <StatusIndicator isConnected={isConnected} lastUpdate={currentReading?.timestamp} />
              </div>
              {currentReading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <SensorCard label="DHT22 Temp" value={currentReading.dht22.temperature} unit="°C" type="temperature" />
                      <SensorCard label="DHT22 Humidity" value={currentReading.dht22.humidity} unit="%" type="humidity" />
                      {currentReading.ntcTemperatures.map((temp, index) => (
                          <SensorCard key={`ntc-${index}`} label={`NTC ${index + 1}`} value={temp} unit="°C" type="temperature" />
                      ))}
                  </div>
              ) : (
                  <div className="flex justify-center items-center h-48">
                    <p className="text-gray-400">Waiting for sensor data...</p>
                  </div>
              )}
          </section>

          <section className="bg-primary-dark p-6 rounded-2xl shadow-lg border border-secondary-dark">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">Data History</h2>
            <div className="h-64 sm:h-80">
              <HistoryChart data={history} />
            </div>
          </section>
        </main>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>ESP32 Data Simulator Active. Updates every {SIMULATION_INTERVAL_MS / 1000} seconds.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
