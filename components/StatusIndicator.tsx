
import React from 'react';

interface StatusIndicatorProps {
    isConnected: boolean;
    lastUpdate?: Date;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isConnected, lastUpdate }) => {
    const statusText = isConnected ? 'Connected' : 'Disconnected';
    const statusColor = isConnected ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className="w-full flex flex-col items-center text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-2">
                <span className={`relative flex h-3 w-3`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusColor} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${statusColor}`}></span>
                </span>
                <span>ESP32 Status: {statusText}</span>
            </div>
            {lastUpdate && (
                <p className="mt-1">
                    Last update: {lastUpdate.toLocaleTimeString()}
                </p>
            )}
        </div>
    );
};

export default StatusIndicator;
