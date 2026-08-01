import { useState } from 'react';
import { Station } from '../../services/api';
import { StationRouteModal } from './StationRouteModal';
import { StationRouteCarousel } from './StationRouteCarousel';
import { MapPinIcon, TrainIcon } from '../icons';
import { ModalIcon, SlideshowIcon, EyeIcon, XIcon } from '../icons/AdditionalIcons';

// Mock stations data for demonstration
// Extending Station type locally for demo purposes
interface DemoStation extends Station {
  nameMm?: string;
}

const mockStations: DemoStation[] = [
  {
    id: 1,
    code: 'YGN',
    name: 'Yangon Central Railway Station',
    nameMm: 'ရန်ကုန် အဓိကဘူတာ',
    city: 'Yangon',
    state: 'Yangon Region',
    platformCount: '8',
    facilities: 'Waiting rooms, AC lounge, Food court, Bookstore, ATMs, Medical facility'
  },
  {
    id: 2,
    code: 'BGN',
    name: 'Bago Railway Station',
    nameMm: 'ပဲခူး ဘူတာရုံ',
    city: 'Bago',
    state: 'Bago Region',
    platformCount: '3',
    facilities: 'Waiting room, Snack shop, Ticket counters'
  },
  {
    id: 3,
    code: 'PYM',
    name: 'Pyay Railway Station',
    nameMm: 'ပြည် ဘူတာရုံ',
    city: 'Pyay',
    state: 'Bago Region',
    platformCount: '2',
    facilities: 'Basic waiting area, Ticket counter'
  },
  {
    id: 4,
    code: 'TGO',
    name: 'Taungoo Railway Station',
    nameMm: 'တောင်ငူ ဘူတာရုံ',
    city: 'Taungoo',
    state: 'Bago Region',
    platformCount: '2',
    facilities: 'Waiting room, Small snack shop'
  },
  {
    id: 5,
    code: 'NPT',
    name: 'Naypyitaw Railway Station',
    nameMm: 'နေပြည်တော် ဘူတာရုံ',
    city: 'Naypyitaw',
    state: 'Naypyidaw Union Territory',
    platformCount: '6',
    facilities: 'Modern waiting areas, VIP lounge, Food court, Shopping arcade'
  },
  {
    id: 6,
    code: 'MDY',
    name: 'Mandalay Central Railway Station',
    nameMm: 'မန္တလေး အဓိကဘူတာ',
    city: 'Mandalay',
    state: 'Mandalay Region',
    platformCount: '5',
    facilities: 'AC waiting rooms, Restaurants, Shopping area, ATMs, Tourist information'
  }
];

interface StationRouteDemoProps {
  currentStationId?: number;
  trainNumber?: string;
  routeName?: string;
}

export function StationRouteDemo({
  currentStationId = 1,
  trainNumber = 'UP01',
  routeName = 'Yangon-Mandalay Express',
}: StationRouteDemoProps) {
  const [showModal, setShowModal] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentStationIndex, setCurrentStationIndex] = useState(
    mockStations.findIndex(station => station.id === currentStationId)
  );
  const [demoMode, setDemoMode] = useState<'modal' | 'carousel' | null>(null);

  const handleStationClick = (station: DemoStation, index: number) => {
    setCurrentStationIndex(index);
    console.log(`Selected station: ${station.name} (${station.code})`);
  };

  const openModal = () => {
    setDemoMode('modal');
    setShowModal(true);
  };

  const openCarousel = () => {
    setDemoMode('carousel');
    setShowCarousel(true);
  };

  const closeDemo = () => {
    setShowModal(false);
    setShowCarousel(false);
    setDemoMode(null);
  };

  return (
    <div className="station-route-demo">
      {/* Demo Controls */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Station Route Display Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Modal Option */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <ModalIcon size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Modal View</h4>
                <p className="text-sm text-slate-600">Full-screen detailed view</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              Opens a modal window showing all stations along the route with detailed information,
              progress tracking, and timeline visualization.
            </p>
            <button
              onClick={openModal}
              className="w-full px-4 py-2.5 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
            >
              <EyeIcon size={18} />
              View Modal Demo
            </button>
          </div>

          {/* Carousel Option */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <SlideshowIcon size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Carousel View</h4>
                <p className="text-sm text-slate-600">Interactive slide navigation</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              Displays stations in an interactive carousel with navigation controls,
              auto-play option, and visual progress indicators.
            </p>
            <button
              onClick={openCarousel}
              className="w-full px-4 py-2.5 bg-emerald-100 text-emerald-700 font-medium rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2"
            >
              <SlideshowIcon size={18} />
              View Carousel Demo
            </button>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="bg-slate-50 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-slate-900">Demo Route: {routeName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <TrainIcon size={16} className="text-slate-400" />
              <span className="text-sm text-slate-600">Train: {trainNumber}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Stations on route</div>
            <div className="text-xl font-bold text-slate-900">{mockStations.length}</div>
          </div>
        </div>

        {/* Mini Station Preview */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-300" />
          <div className="space-y-4">
            {mockStations.slice(0, 3).map((station, index) => (
              <div key={station.id} className="relative flex items-center gap-3">
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index === 0
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                    : 'bg-slate-100 border-slate-300 text-slate-500'
                }`}>
                  {index === 0 ? <TrainIcon size={14} /> : <MapPinIcon size={14} />}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{station.name}</div>
                  <div className="text-sm text-slate-600">{station.code} • {station.city}</div>
                </div>
                {index === 0 && (
                  <div className="ml-auto px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-md">
                    Start
                  </div>
                )}
              </div>
            ))}
            {mockStations.length > 3 && (
              <div className="relative flex items-center gap-3">
                <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-slate-100 border-slate-300 text-slate-500">
                  <div className="text-xs font-medium">+{mockStations.length - 3}</div>
                </div>
                <div className="text-sm text-slate-600">
                  {mockStations.length - 3} more stations...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Station Display */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-900">Current Station</h4>
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-500">Select station:</div>
            <select
              value={currentStationIndex}
              onChange={(e) => setCurrentStationIndex(Number(e.target.value))}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1"
            >
              {mockStations.map((station, index) => (
                <option key={station.id} value={index}>
                  {station.code} - {station.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-4 border-emerald-300">
            <TrainIcon size={24} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 text-lg">
              {mockStations[currentStationIndex].name}
            </div>
            <div className="text-sm text-slate-600">
              {mockStations[currentStationIndex].city}, {mockStations[currentStationIndex].state}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-sm">
                {mockStations[currentStationIndex].code}
              </div>
              {mockStations[currentStationIndex].platformCount && (
                <div className="text-sm text-slate-600">
                  {mockStations[currentStationIndex].platformCount} platforms
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Demo */}
      {showModal && (
        <StationRouteModal
          isOpen={showModal}
          onClose={closeDemo}
          routeName={routeName}
          stations={mockStations}
          currentStationIndex={currentStationIndex}
          trainNumber={trainNumber}
          departureTime="2026-07-26T08:00:00"
          arrivalTime="2026-07-26T18:30:00"
        />
      )}

      {/* Carousel Demo - Inline */}
      {showCarousel && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Station Route Carousel</h3>
              <p className="text-sm text-slate-600">Interactive station navigation</p>
            </div>
            <button
              onClick={closeDemo}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <XIcon size={18} />
              Close Demo
            </button>
          </div>
          <div className="p-6">
            <StationRouteCarousel
              stations={mockStations}
              currentStationIndex={currentStationIndex}
              routeName={routeName}
              onStationClick={handleStationClick}
            />
          </div>
        </div>
      )}

      <style>{`
        .station-route-demo {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
        }
        
        @media (max-width: 768px) {
          .station-route-demo {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}