
import React from 'react';

interface TemperatureDisplayProps {
  temperature: number;
}

const getTemperatureColor = (temp: number): string => {
  if (temp < 18) return 'text-blue-400';
  if (temp < 26) return 'text-green-400';
  if (temp < 30) return 'text-yellow-400';
  return 'text-accent-pink';
};

const ThermometerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v10a4 4 0 104 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16a4 4 0 014 0" />
    </svg>
);


const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ temperature }) => {
  const tempColor = getTemperatureColor(temperature);

  return (
    <div className="relative flex flex-col items-center justify-center text-center mt-4">
      <div className="flex items-end">
        <span className={`font-mono font-bold text-7xl sm:text-8xl md:text-9xl tracking-tighter ${tempColor} transition-colors duration-500`}>
          {temperature.toFixed(1)}
        </span>
        <span className={`font-mono text-3xl sm:text-4xl md:text-5xl font-bold ml-1 mb-3 ${tempColor} transition-colors duration-500`}>
          °C
        </span>
      </div>
      <p className="text-gray-400 mt-2 text-lg">Current Temperature</p>
    </div>
  );
};

export default TemperatureDisplay;
