import { useBackendAvailability, useApiHealth, useStations, useTrains } from '../../hooks/useApi';
import { Wifi, WifiOff, Server, AlertCircle, Train, MapPin, Database } from 'lucide-react';
import { useState } from 'react';

export function BackendStatus() {
  const { isAvailable, checking } = useBackendAvailability();
  const { health, loading: healthLoading } = useApiHealth();
  const { stations, loading: stationsLoading } = useStations();
  const { trains, loading: trainsLoading } = useTrains();
  const [showDetails, setShowDetails] = useState(false);

  if (checking || healthLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-600 shadow-lg">
        <Server className="h-4 w-4 animate-pulse" />
        <span>Checking backend connection...</span>
      </div>
    );
  }

  if (!isAvailable) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 shadow-lg">
        <WifiOff className="h-4 w-4" />
        <span>Backend unavailable - Using mock data</span>
      </div>
    );
  }

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Status Card */}
      <div 
        className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 shadow-lg cursor-pointer hover:bg-green-100 transition-colors"
        onClick={handleClick}
      >
        <Wifi className="h-4 w-4" />
        <div className="flex flex-col">
          <span>Myanmar Railways Backend</span>
          {health && (
            <span className="text-xs text-green-600">
              {health.service} • v{health.version}
            </span>
          )}
        </div>
      </div>

      {/* Detailed Information Panel */}
      {showDetails && (
        <div className="mt-2 rounded-lg bg-white border border-gray-200 shadow-lg w-80 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Myanmar Railways Data Status
            </h3>
          </div>
          
          <div className="p-3 space-y-3">
            {/* Health Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Backend Health</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Wifi className="h-3 w-3 mr-1" />
                Healthy
              </span>
            </div>

            {/* Stations Data */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-900">Stations</span>
                  <div className="text-xs text-gray-500">
                    {stationsLoading ? 'Loading...' : `${stations.length} Myanmar stations loaded`}
                  </div>
                </div>
              </div>
              {!stationsLoading && (
                <span className="text-xs font-medium text-gray-700">
                  {stations.length}
                </span>
              )}
            </div>

            {/* Sample Stations */}
            {!stationsLoading && stations.length > 0 && (
              <div className="bg-gray-50 rounded p-2">
                <div className="text-xs font-medium text-gray-600 mb-1">Major Stations:</div>
                <div className="flex flex-wrap gap-1">
                  {stations.slice(0, 5).map(station => (
                    <div key={station.id} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
                      <span className="font-mono text-xs">{station.code}</span>
                    </div>
                  ))}
                  {stations.length > 5 && (
                    <div className="px-2 py-1 text-xs text-gray-500">
                      +{stations.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Trains Data */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Train className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-900">Trains</span>
                  <div className="text-xs text-gray-500">
                    {trainsLoading ? 'Loading...' : `${trains.length} Myanmar trains available`}
                  </div>
                </div>
              </div>
              {!trainsLoading && (
                <span className="text-xs font-medium text-gray-700">
                  {trains.length}
                </span>
              )}
            </div>

            {/* Sample Trains */}
            {!trainsLoading && trains.length > 0 && (
              <div className="bg-gray-50 rounded p-2">
                <div className="text-xs font-medium text-gray-600 mb-1">Active Trains:</div>
                <div className="space-y-1">
                  {trains.slice(0, 3).map(train => (
                    <div key={train.id} className="flex items-center justify-between px-2 py-1 bg-white border border-gray-200 rounded">
                      <span className="text-xs font-medium">{train.trainNumber}</span>
                      <span className="text-xs text-gray-600">{train.trainName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* API Info */}
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 flex items-center justify-between">
                <span>API Base URL:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {import.meta.env.VITE_API_BASE_URL}
                </code>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <a 
                  href="http://localhost:8081/h2-console" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  H2 Database Console →
                </a>
                <a 
                  href="https://ort.railways.gov.mm/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Myanmar Railways →
                </a>
              </div>
            </div>
          </div>

          {/* Close button */}
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => setShowDetails(false)}
              className="w-full text-xs text-gray-500 hover:text-gray-700 text-center"
            >
              Click anywhere to close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function BackendStatusInline() {
  const { isAvailable, checking } = useBackendAvailability();

  if (checking) {
    return (
      <div className="inline-flex items-center gap-1 text-sm text-gray-500">
        <Server className="h-3 w-3 animate-pulse" />
        <span>Connecting...</span>
      </div>
    );
  }

  if (!isAvailable) {
    return (
      <div className="inline-flex items-center gap-1 text-sm text-amber-600">
        <AlertCircle className="h-3 w-3" />
        <span>Offline mode</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 text-sm text-green-600">
      <Wifi className="h-3 w-3" />
      <span>Online</span>
    </div>
  );
}