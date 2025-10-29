import React from 'react';

interface SensorCardProps {
  label: string;
  value: number;
  unit: string;
  type: 'temperature' | 'humidity';
}

const getReadingColor = (value: number, type: 'temperature' | 'humidity'): string => {
  if (type === 'temperature') {
    if (value < 18) return 'text-blue-400';
    if (value < 26) return 'text-green-400';
    if (value < 30) return 'text-yellow-400';
    return 'text-accent-pink';
  } else { // humidity
    if (value < 30) return 'text-yellow-500';
    if (value < 60) return 'text-sky-400';
    return 'text-blue-500';
  }
};

const ThermometerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v10a4 4 0 104 0z" /></svg>
);

const HumidityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a5 5 0 01-.962-9.854A5 5 0 0112 6a5 5 0 014.962 4.146A5 5 0 0117 16H7z" /></svg>
);

const SensorCard: React.FC<SensorCardProps> = ({ label, value, unit, type }) => {
  const color = getReadingColor(value, type);
  return (
    <div className="bg-secondary-dark p-4 rounded-lg shadow-md flex flex-col justify-between h-full border border-gray-700/50">
      <div className="flex justify-between items-start text-gray-400">
        <h3 className="font-semibold text-base">{label}</h3>
        {type === 'temperature' ? <ThermometerIcon /> : <HumidityIcon />}
      </div>
      <div className="text-right mt-2">
        <span className={`font-mono font-bold text-3xl ${color} transition-colors duration-300`}>
          {value.toFixed(1)}
        </span>
        <span className={`font-mono text-lg ml-1 ${color} transition-colors duration-300`}>{unit}</span>
      </div>
    </div>
  );
};

export default SensorCard;
