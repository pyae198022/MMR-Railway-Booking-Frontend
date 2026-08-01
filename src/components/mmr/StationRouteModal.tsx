import { useState, useEffect } from 'react';
import { Station } from '../../services/api';
import { MapPinIcon, TrainIcon, ClockIcon } from '../icons';
import { XIcon, ChevronRightIcon } from '../icons/AdditionalIcons';

interface StationRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  routeName: string;
  stations: Station[];
  currentStationIndex?: number;
  trainNumber?: string;
  departureTime?: string;
  arrivalTime?: string;
}

export function StationRouteModal({
  isOpen,
  onClose,
  routeName,
  stations,
  currentStationIndex = 0,
  trainNumber,
  departureTime,
  arrivalTime,
}: StationRouteModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const calculateProgress = (index: number) => {
    if (stations.length <= 1) return 0;
    return (index / (stations.length - 1)) * 100;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-6 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Stations along {routeName}</h2>
            {trainNumber && (
              <div className="flex items-center gap-2 mt-1">
                <TrainIcon size={16} className="text-slate-400" />
                <span className="text-sm text-slate-600">Train: {trainNumber}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <XIcon size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Route Info */}
        {departureTime && arrivalTime && (
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <ClockIcon size={20} />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Departure</div>
                  <div className="font-semibold text-slate-900">{formatTime(departureTime)}</div>
                </div>
              </div>
              <ChevronRightIcon size={20} className="text-slate-400" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ClockIcon size={20} />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Arrival</div>
                  <div className="font-semibold text-slate-900">{formatTime(arrivalTime)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stations List */}
        <div className="p-6">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
            
            {/* Stations */}
            <div className="space-y-8">
              {stations.map((station, index) => {
                const isCurrent = index === currentStationIndex;
                const isPassed = index < currentStationIndex;
                const isUpcoming = index > currentStationIndex;
                const progress = calculateProgress(index);

                return (
                  <div key={station.id} className="relative flex items-start gap-4">
                    {/* Station Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                        isCurrent 
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-700' 
                          : isPassed
                          ? 'bg-blue-100 border-blue-400 text-blue-600'
                          : 'bg-slate-100 border-slate-300 text-slate-500'
                      }`}>
                        {isCurrent ? (
                          <TrainIcon size={20} />
                        ) : (
                          <MapPinIcon size={20} />
                        )}
                      </div>
                      
                      {/* Progress Indicator */}
                      {index < stations.length - 1 && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8">
                          <div 
                            className={`w-full ${
                              isPassed ? 'bg-blue-400' : 'bg-slate-200'
                            }`}
                            style={{ height: '100%' }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Station Details */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h3 className={`font-semibold ${
                            isCurrent ? 'text-emerald-700 text-lg' : 'text-slate-900'
                          }`}>
                            {station.name}
                            {isCurrent && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded-full">
                                Current
                              </span>
                            )}
                          </h3>
                          <div className="text-sm text-slate-600">{station.city}, {station.state}</div>
                        </div>
                        <div className="text-right">
                          <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-sm font-medium">
                            {station.code}
                          </div>
                          {station.facilities && (
                            <div className="mt-1 text-xs text-slate-500">{station.facilities}</div>
                          )}
                        </div>
                      </div>

                      {/* Station Facilities */}
                      {station.platformCount && (
                        <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span>{station.platformCount} platforms</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Station #{index + 1}</span>
                          </div>
                        </div>
                      )}

                      {/* Progress Bar */}
                      {index < stations.length - 1 && (
                        <div className="mt-4">
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                isPassed ? 'bg-blue-400' : 'bg-slate-300'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {isPassed ? 'Completed' : isCurrent ? 'In progress' : 'Upcoming'} • {progress.toFixed(0)}% of route
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-white p-6 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {stations.length} stations along this route
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}