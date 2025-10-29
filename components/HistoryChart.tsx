import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type SensorReadings } from '../types';

interface HistoryChartProps {
  data: SensorReadings[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const formattedData = data.map(reading => {
    const allTemps = [...reading.ntcTemperatures, reading.dht22.temperature];
    const avgTemp = allTemps.reduce((sum, temp) => sum + temp, 0) / allTemps.length;

    return {
      time: reading.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      'Avg Temperature': parseFloat(avgTemp.toFixed(2)),
      'Humidity': parseFloat(reading.dht22.humidity.toFixed(2)),
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
        <XAxis dataKey="time" stroke="#8892b0" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis 
            yAxisId="left"
            stroke="#53d8fb"
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            domain={['dataMin - 1', 'dataMax + 1']}
            tickFormatter={(value) => `${value}°C`}
        />
        <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            domain={['dataMin - 5', 'dataMax + 5']}
            tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(22, 33, 62, 0.85)',
            borderColor: '#53d8fb',
            color: '#ffffff',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Legend wrapperStyle={{fontSize: "14px"}}/>
        <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="Avg Temperature" 
            stroke="#53d8fb" 
            strokeWidth={2}
            dot={{ r: 2, fill: '#53d8fb' }}
            activeDot={{ r: 6, stroke: '#1a1a2e', strokeWidth: 2 }}
        />
        <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="Humidity" 
            stroke="#82ca9d" 
            strokeWidth={2}
            dot={{ r: 2, fill: '#82ca9d' }}
            activeDot={{ r: 6, stroke: '#1a1a2e', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
