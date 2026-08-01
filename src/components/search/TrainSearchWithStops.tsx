import { useState, useEffect } from 'react';
import { useRouteStops } from '../../hooks/useRouteStops';
import { StationRouteModal } from '../mmr/StationRouteModal';
import { StationRouteCarousel } from '../mmr/StationRouteCarousel';
import { apiService, Train, Station } from '../../services/api';
import { MapPinIcon, TrainIcon, ClockIcon, UsersIcon, DollarSignIcon, EyeIcon } from '../icons/AdditionalIcons';

interface TrainSearchWithStopsProps {
  searchParams: {
    sourceCity: string;
    destinationCity: string;
    journeyDate: string;
    numberOfPassengers: number;
  };
  onBack?: () => void;
}

interface TrainWithStops extends Train {
  routeStops?: any[];
  showStops?: boolean;
}

export function TrainSearchWithStops({ searchParams, onBack }: TrainSearchWithStopsProps) {
  const [trains, setTrains] = useState<TrainWithStops[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrainId, setSelectedTrainId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [expandedTrainId, setExpandedTrainId] = useState<number | null>(null);

  // Mock route data (in real app, this would come from API)
  const mockRouteMap: Record<number, number> = {
    1: 2, // Yangon-Mandalay Express -> YGN-MDY-001 route
    2: 1, // Yangon-Naypyitaw Special -> YGN-NPT-001 route
    3: 4, // Mandalay-Bago Local -> MDY-BGN-001 route
    4: 3, // Yangon-Mawlamyine Express -> YGN-MAW-001 route
    5: 5, // Mandalay-Myitkyina Special -> MDY-MYK-001 route
  };

  // Fetch trains based on search parameters
  const fetchTrains = async () => {
    try {
      setLoading(true);
      setError(null);

      // Search trains using the API
      const searchResults = await apiService.searchTrains(searchParams);
      
      // Enhance trains with route stops data
      const enhancedTrains: TrainWithStops[] = searchResults.map(result => ({
        ...result.train,
        routeStops: [], // Will be populated when user expands
        showStops: false
      }));

      setTrains(enhancedTrains);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search trains';
      setError(errorMessage);
      console.error('Train search failed:', err);
      
      // Fallback to mock data if API fails
      const mockTrains: TrainWithStops[] = getMockTrainsForRoute(searchParams.sourceCity, searchParams.destinationCity);
      setTrains(mockTrains);
    } finally {
      setLoading(false);
    }
  };

  const getMockTrainsForRoute = (sourceCity: string, destinationCity: string): TrainWithStops[] => {
    // Mock trains based on common Myanmar routes
    const mockTrains: TrainWithStops[] = [
      {
        id: 1,
        trainNumber: 'TR-001',
        trainName: 'Yangon-Mandalay Express',
        sourceStation: { id: 1, code: 'YGN', name: 'Yangon Central Railway Station', city: 'Yangon', state: 'Yangon Region' },
        destinationStation: { id: 5, code: 'MDY', name: 'Mandalay Railway Station', city: 'Mandalay', state: 'Mandalay' },
        departureTime: '2026-07-26T07:00:00',
        arrivalTime: '2026-07-26T17:30:00',
        totalSeats: 200,
        availableSeats: 180,
        basePrice: 15000,
        trainType: 'Express',
        status: 'ACTIVE',
        travelDuration: 630,
        calculatedPrice: 15000,
        routeStops: [],
        showStops: false
      },
      {
        id: 2,
        trainNumber: 'TR-002',
        trainName: 'Yangon-Naypyitaw Special',
        sourceStation: { id: 1, code: 'YGN', name: 'Yangon Central Railway Station', city: 'Yangon', state: 'Yangon Region' },
        destinationStation: { id: 8, code: 'NPT', name: 'Naypyitaw Railway Station', city: 'Naypyitaw', state: 'Naypyitaw' },
        departureTime: '2026-07-26T09:30:00',
        arrivalTime: '2026-07-26T13:00:00',
        totalSeats: 180,
        availableSeats: 150,
        basePrice: 8000,
        trainType: 'Special',
        status: 'ACTIVE',
        travelDuration: 210,
        calculatedPrice: 8000,
        routeStops: [],
        showStops: false
      }
    ];

    // Filter based on source and destination cities
    return mockTrains.filter(train => 
      train.sourceStation.city.toLowerCase().includes(sourceCity.toLowerCase()) &&
      train.destinationStation.city.toLowerCase().includes(destinationCity.toLowerCase())
    );
  };

  const toggleTrainStops = (trainId: number) => {
    setTrains(prev => prev.map(train => {
      if (train.id === trainId) {
        const shouldExpand = !train.showStops;
        return {
          ...train,
          showStops: shouldExpand,
          routeStops: shouldExpand ? getMockRouteStops(train.id) : []
        };
      }
      return train;
    }));
    
    if (expandedTrainId === trainId) {
      setExpandedTrainId(null);
    } else {
      setExpandedTrainId(trainId);
    }
  };

  const getMockRouteStops = (trainId: number) => {
    // Mock route stops based on train ID
    switch (trainId) {
      case 1: // Yangon-Mandalay Express
        return [
          { id: 1, stopOrder: 1, station: { name: 'Yangon Central', code: 'YGN', city: 'Yangon' }, distanceFromStart: 0, estimatedArrivalOffset: 0, stopDuration: 0 },
          { id: 2, stopOrder: 2, station: { name: 'Bago Station', code: 'BGN', city: 'Bago' }, distanceFromStart: 80, estimatedArrivalOffset: 120, stopDuration: 5 },
          { id: 3, stopOrder: 3, station: { name: 'Pyay Station', code: 'PYA', city: 'Pyay' }, distanceFromStart: 180, estimatedArrivalOffset: 240, stopDuration: 5 },
          { id: 4, stopOrder: 4, station: { name: 'Naypyitaw Station', code: 'NPT', city: 'Naypyitaw' }, distanceFromStart: 320, estimatedArrivalOffset: 420, stopDuration: 10 },
          { id: 5, stopOrder: 5, station: { name: 'Mandalay Station', code: 'MDY', city: 'Mandalay' }, distanceFromStart: 500, estimatedArrivalOffset: 630, stopDuration: 0 }
        ];
      case 2: // Yangon-Naypyitaw Special
        return [
          { id: 1, stopOrder: 1, station: { name: 'Yangon Central', code: 'YGN', city: 'Yangon' }, distanceFromStart: 0, estimatedArrivalOffset: 0, stopDuration: 0 },
          { id: 2, stopOrder: 2, station: { name: 'Bago Station', code: 'BGN', city: 'Bago' }, distanceFromStart: 80, estimatedArrivalOffset: 90, stopDuration: 5 },
          { id: 3, stopOrder: 3, station: { name: 'Pyay Station', code: 'PYA', city: 'Pyay' }, distanceFromStart: 180, estimatedArrivalOffset: 180, stopDuration: 5 },
          { id: 4, stopOrder: 4, station: { name: 'Naypyitaw Station', code: 'NPT', city: 'Naypyitaw' }, distanceFromStart: 320, estimatedArrivalOffset: 210, stopDuration: 0 }
        ];
      default:
        return [];
    }
  };

  const handleViewStopsModal = (trainId: number) => {
    setSelectedTrainId(trainId);
    setShowModal(true);
  };

  const handleViewStopsCarousel = (trainId: number) => {
    setSelectedTrainId(trainId);
    setShowCarousel(true);
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-MM', {
      style: 'currency',
      currency: 'MMK',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    fetchTrains();
  }, [searchParams]);

  const selectedTrain = trains.find(train => train.id === selectedTrainId);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-slate-700">Searching for trains...</p>
          <p className="text-sm text-slate-500 mt-1">
            Finding best routes from {searchParams.sourceCity} to {searchParams.destinationCity}
          </p>
        </div>
      </div>
    );
  }

  if (error && trains.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="text-red-600 font-medium text-lg mb-2">Search Error</div>
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors"
        >
          Back to Search
        </button>
      </div>
    );
  }

  if (trains.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
        <div className="text-yellow-700 font-medium text-lg mb-2">No Trains Found</div>
        <p className="text-yellow-600 mb-4">
          No trains available for {searchParams.sourceCity} to {searchParams.destinationCity} on {new Date(searchParams.journeyDate).toLocaleDateString()}
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-yellow-100 text-yellow-700 font-medium rounded-lg hover:bg-yellow-200 transition-colors"
        >
          Modify Search
        </button>
      </div>
    );
  }

  return (
    <div className="train-search-with-stops">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Available Trains</h2>
            <p className="text-slate-600 mt-1">
              {searchParams.sourceCity} → {searchParams.destinationCity} • {new Date(searchParams.journeyDate).toLocaleDateString()} • {searchParams.numberOfPassengers} passenger{searchParams.numberOfPassengers > 1 ? 's' : ''}
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              New Search
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {trains.map((train) => (
          <div key={train.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Train Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <TrainIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{train.trainName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-sm">
                          {train.trainNumber}
                        </span>
                        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                          train.trainType === 'Express' ? 'bg-blue-100 text-blue-700' :
                          train.trainType === 'Special' ? 'bg-purple-100 text-purple-700' :
                          train.trainType === 'Local' ? 'bg-green-100 text-green-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {train.trainType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{formatPrice(train.basePrice)}</div>
                  <div className="text-sm text-slate-600">per passenger</div>
                </div>
              </div>
            </div>

            {/* Train Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Departure */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <MapPinIcon size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Departure</div>
                      <div className="font-semibold text-slate-900">{formatTime(train.departureTime)}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">{train.sourceStation.name}</div>
                  <div className="text-xs text-slate-500">{train.sourceStation.city}</div>
                </div>

                {/* Duration */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <ClockIcon size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Duration</div>
                      <div className="font-semibold text-slate-900">{formatDuration(train.travelDuration || 0)}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">Direct journey</div>
                  <div className="text-xs text-slate-500">{train.availableSeats} seats available</div>
                </div>

                {/* Arrival */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <MapPinIcon size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Arrival</div>
                      <div className="font-semibold text-slate-900">{formatTime(train.arrivalTime)}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">{train.destinationStation.name}</div>
                  <div className="text-xs text-slate-500">{train.destinationStation.city}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTrainStops(train.id)}
                    className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <EyeIcon size={18} />
                    {train.showStops ? 'Hide Stops' : 'View Stops'}
                  </button>
                  
                  <button
                    onClick={() => handleViewStopsModal(train.id)}
                    className="px-5 py-2.5 border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <MapPinIcon size={18} />
                    Detailed Route
                  </button>
                </div>

                <button className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  <UsersIcon size={20} />
                  Select Train
                </button>
              </div>

              {/* Route Stops (Expandable) */}
              {train.showStops && train.routeStops && train.routeStops.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Stops along this route:</h4>
                  
                  <div className="relative">
                    {/* Timeline */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
                    
                    {/* Stops */}
                    <div className="space-y-4">
                      {train.routeStops.map((stop, index) => (
                        <div key={stop.id} className="relative flex items-start gap-4">
                          {/* Stop Dot */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              index === 0 
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-700' 
                                : index === train.routeStops!.length - 1
                                ? 'bg-purple-100 border-purple-500 text-purple-700'
                                : 'bg-slate-100 border-slate-300 text-slate-500'
                            }`}>
                              {index === 0 || index === train.routeStops!.length - 1 ? (
                                <TrainIcon size={14} />
                              ) : (
                                <MapPinIcon size={14} />
                              )}
                            </div>
                          </div>

                          {/* Stop Details */}
                          <div className="flex-1 pt-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-slate-900">{stop.station.name}</div>
                                <div className="text-sm text-slate-600">{stop.station.city} • Stop #{stop.stopOrder}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-slate-500">Arrival: +{stop.estimatedArrivalOffset}m</div>
                                {stop.stopDuration > 0 && (
                                  <div className="text-sm text-slate-500">Stop: {stop.stopDuration}m</div>
                                )}
                              </div>
                            </div>
                            
                            {stop.distanceFromStart > 0 && (
                              <div className="mt-2 text-xs text-slate-500">
                                {stop.distanceFromStart} km from start • Platform {stop.platformNumber || '1'}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carousel Option */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleViewStopsCarousel(train.id)}
                      className="w-full px-4 py-3 border border-emerald-300 text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <EyeIcon size={18} />
                      View Interactive Route Carousel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-slate-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">Search Summary</h4>
            <p className="text-sm text-slate-600">
              Found {trains.length} train{trains.length > 1 ? 's' : ''} for your journey
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Passengers</div>
            <div className="text-lg font-bold text-slate-900">{searchParams.numberOfPassengers}</div>
          </div>
        </div>
      </div>

      {/* Modal for detailed route view */}
      {showModal && selectedTrain && (
        <StationRouteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          routeName={selectedTrain.trainName}
          stations={selectedTrain.routeStops?.map(stop => ({
            id: stop.id,
            code: stop.station.code,
            name: stop.station.name,
            city: stop.station.city,
            state: '',
            platformCount: '1',
            facilities: ''
          })) || []}
          currentStationIndex={0}
          trainNumber={selectedTrain.trainNumber}
          departureTime={selectedTrain.departureTime}
          arrivalTime={selectedTrain.arrivalTime}
        />
      )}

      {/* Carousel for interactive route view */}
      {showCarousel && selectedTrain && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedTrain.trainName} Route</h3>
              <p className="text-slate-600">{selectedTrain.trainNumber} • Interactive Station Navigation</p>
            </div>
            <button
              onClick={() => setShowCarousel(false)}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
          <div className="p-6">
            <StationRouteCarousel
              stations={selectedTrain.routeStops?.map(stop => ({
                id: stop.id,
                code: stop.station.code,
                name: stop.station.name,
                city: stop.station.city,
                state: '',
                platformCount: '1',
                facilities: ''
              })) || []}
              currentStationIndex={0}
              routeName={selectedTrain.trainName}
              onStationClick={(station, index) => console.log('Selected station:', station)}
            />
          </div>
        </div>
      )}

      <style>{`
        .train-search-with-stops {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .train-search-with-stops .train-card {
          transition: all 0.3s ease;
        }
        
        .train-search-with-stops .train-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}