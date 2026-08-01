import { useState } from 'react';
import { Station } from '../../services/api';
import { StationRouteModal } from './StationRouteModal';
import { StationRouteCarousel } from './StationRouteCarousel';
import { useStations } from '../../hooks/useApi';
import { TrainIcon, MapPinIcon, EyeIcon, PanelLeftIcon, LayoutGridIcon } from '../icons/AdditionalIcons';

interface StationDisplayExampleProps {
  trainId?: number;
  routeName?: string;
  trainNumber?: string;
}

export function StationDisplayExample({
  trainId,
  routeName = 'Yangon-Mandalay Express',
  trainNumber = 'UP01',
}: StationDisplayExampleProps) {
  const { stations, loading, error } = useStations();
  const [showModal, setShowModal] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);

  // Filter stations for a sample route (Yangon to Mandalay stations)
  const routeStations: Station[] = stations.filter(station => 
    ['Yangon', 'Bago', 'Pyay', 'Taungoo', 'Naypyitaw', 'Mandalay'].includes(station.city)
  ).slice(0, 6); // Take first 6 stations for demo

  const handleViewStations = (mode: 'modal' | 'carousel') => {
    if (mode === 'modal') {
      setShowModal(true);
    } else {
      setShowCarousel(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-3 text-slate-600">Loading stations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-600 font-medium mb-2">Error loading stations</div>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="station-display-example">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Station Display Options</h3>
        <p className="text-slate-600">
          Choose how to view stations along the {routeName} route. Both options provide interactive
          ways to explore station details and track your journey progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Station List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">Stations along {routeName}</h4>
              <div className="flex items-center gap-2">
                <TrainIcon size={18} className="text-slate-400" />
                <span className="text-sm text-slate-600">{trainNumber}</span>
              </div>
            </div>

            <div className="space-y-4">
              {routeStations.map((station, index) => (
                <div 
                  key={station.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    index === currentStationIndex
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                  onClick={() => setCurrentStationIndex(index)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === currentStationIndex
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-2 border-slate-300'
                  }`}>
                    {index === currentStationIndex ? (
                      <TrainIcon size={18} />
                    ) : (
                      <MapPinIcon size={18} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{station.name}</div>
                    <div className="text-sm text-slate-600">{station.city}, {station.state}</div>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-sm">
                      {station.code}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Station #{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Click on any station to select it. Currently selected: {routeStations[currentStationIndex]?.name}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Display Options */}
        <div className="space-y-6">
          {/* Modal Option */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <PanelLeftIcon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Modal View</h4>
                <p className="text-sm text-slate-600">Detailed overview</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              Opens a full-screen modal with all stations, timeline visualization, and detailed station information.
            </p>
            <button
              onClick={() => handleViewStations('modal')}
              className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <EyeIcon size={18} />
              Open Modal
            </button>
          </div>

          {/* Carousel Option */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <LayoutGridIcon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Carousel View</h4>
                <p className="text-sm text-slate-600">Interactive slides</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              Navigate through stations with a carousel interface, auto-play, and visual progress tracking.
            </p>
            <button
              onClick={() => handleViewStations('carousel')}
              className="w-full px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <LayoutGridIcon size={18} />
              Open Carousel
            </button>
          </div>

          {/* Current Station Info */}
          <div className="bg-slate-50 rounded-xl p-5">
            <h4 className="font-semibold text-slate-900 mb-3">Current Selection</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <MapPinIcon size={20} />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{routeStations[currentStationIndex]?.name}</div>
                  <div className="text-sm text-slate-600">{routeStations[currentStationIndex]?.city}</div>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                Station {currentStationIndex + 1} of {routeStations.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <StationRouteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          routeName={routeName}
          stations={routeStations}
          currentStationIndex={currentStationIndex}
          trainNumber={trainNumber}
          departureTime="2026-07-26T08:00:00"
          arrivalTime="2026-07-26T18:30:00"
        />
      )}

      {/* Carousel (inline) */}
      {showCarousel && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Station Carousel</h4>
            <button
              onClick={() => setShowCarousel(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              Close Carousel
            </button>
          </div>
          <StationRouteCarousel
            stations={routeStations}
            currentStationIndex={currentStationIndex}
            routeName={routeName}
            onStationClick={(station, index) => setCurrentStationIndex(index)}
          />
        </div>
      )}

      <style>{`
        .station-display-example {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .station-display-example .station-item {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .station-display-example .station-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}