import { useState, useEffect } from 'react';
import { Station } from '../../services/api';
import { MapPinIcon, TrainIcon, ClockIcon } from '../icons';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '../icons/AdditionalIcons';

interface StationRouteCarouselProps {
  stations: Station[];
  currentStationIndex?: number;
  routeName?: string;
  showControls?: boolean;
  onStationClick?: (station: Station, index: number) => void;
  compact?: boolean;
}

export function StationRouteCarousel({
  stations,
  currentStationIndex = 0,
  routeName,
  showControls = true,
  onStationClick,
  compact = false,
}: StationRouteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(currentStationIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(currentStationIndex);
  }, [currentStationIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && stations.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % stations.length);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, stations.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stations.length) % stations.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stations.length);
  };

  const goToStation = (index: number) => {
    setCurrentIndex(index);
  };

  const handleStationClick = (station: Station, index: number) => {
    if (onStationClick) {
      onStationClick(station, index);
    } else {
      goToStation(index);
    }
  };

  if (stations.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-slate-500">
        <div className="text-center">
          <MapPinIcon size={32} className="mx-auto text-slate-300 mb-2" />
          <p>No stations available</p>
        </div>
      </div>
    );
  }

  const currentStation = stations[currentIndex];
  const progressPercentage = ((currentIndex + 1) / stations.length) * 100;

  return (
    <div className={`station-route-carousel ${compact ? 'compact' : ''}`}>
      {/* Header */}
      {routeName && (
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900 text-lg">{routeName}</h3>
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-slate-600">
              Station {currentIndex + 1} of {stations.length}
            </div>
            {showControls && stations.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    isAutoPlaying
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isAutoPlaying ? 'Pause' : 'Auto-play'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Carousel Area */}
      <div className="relative">
        {/* Navigation Arrows */}
        {showControls && stations.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="Previous station"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="Next station"
            >
              <ChevronRightIcon size={20} />
            </button>
          </>
        )}

        {/* Current Station Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Station Image/Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-emerald-500">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2">
                  <TrainIcon size={16} className="text-slate-700" />
                  <span className="text-sm font-medium text-slate-900">Station {currentIndex + 1}</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <div className="text-xs font-medium opacity-90">CURRENT STATION</div>
                  <h2 className="text-xl font-bold">{currentStation.name}</h2>
                </div>
                <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg">
                  <div className="text-lg font-bold text-slate-900">{currentStation.code}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Station Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Station Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <MapPinIcon size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Location</div>
                      <div className="font-medium text-slate-900">{currentStation.city}, {currentStation.state}</div>
                    </div>
                  </div>
                  
                  {currentStation.platformCount && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Platforms</div>
                        <div className="font-medium text-slate-900">{currentStation.platformCount} platforms available</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Facilities */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Facilities</h4>
                <div className="space-y-2">
                  {currentStation.facilities ? (
                    <div className="text-slate-700">{currentStation.facilities}</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm">Waiting rooms</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-sm">Ticket counters</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-sm">Food stalls</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-sm">Restrooms</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pb-6">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-slate-600">
                Progress: {progressPercentage.toFixed(0)}%
              </div>
              <div className="text-sm text-slate-600">
                {currentIndex + 1}/{stations.length} stations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Station Dots Navigation */}
      {stations.length > 1 && (
        <div className="mt-6">
          <div className="flex items-center justify-center gap-2">
            {stations.map((station, index) => (
              <button
                key={station.id}
                onClick={() => handleStationClick(station, index)}
                className={`relative flex flex-col items-center ${
                  index === currentIndex ? 'active' : ''
                }`}
                aria-label={`Go to ${station.name}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  index === currentIndex
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-700 scale-110'
                    : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
                }`}>
                  {index === currentIndex ? (
                    <TrainIcon size={16} />
                  ) : (
                    <MapPinIcon size={16} />
                  )}
                </div>
                <div className={`mt-1 text-xs font-medium transition-colors ${
                  index === currentIndex ? 'text-emerald-700' : 'text-slate-500'
                }`}>
                  {station.code}
                </div>
                {/* Connector Line */}
                {index < stations.length - 1 && (
                  <div className="absolute top-5 left-full w-6 h-0.5">
                    <div className={`w-full h-full ${
                      index < currentIndex ? 'bg-emerald-400' : 'bg-slate-300'
                    }`} />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="mt-2 text-center text-sm text-slate-600">
            Click on station codes to navigate
          </div>
        </div>
      )}

      <style>{`
        .station-route-carousel {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .station-route-carousel.compact {
          max-width: 600px;
        }
        
        .station-route-carousel.compact .current-station-card {
          padding: 1rem;
        }
        
        .station-route-carousel.compact h2 {
          font-size: 1.25rem;
        }
        
        /* Animation for station transition */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .current-station-card {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}