import { useState } from 'react';
import { EnhancedSearchForm } from '../components/search/EnhancedSearchForm';
import { TrainSearchWithStops } from '../components/search/TrainSearchWithStops';
import { MyanmarRailwayInfo } from '../components/mmr/MyanmarRailwayInfo';
import { TrainIcon, SearchIcon, MapPinIcon } from '../icons/AdditionalIcons';

export function TrainSearchPage() {
  const [searchState, setSearchState] = useState<'form' | 'results'>('form');
  const [searchParams, setSearchParams] = useState<{
    sourceCity: string;
    destinationCity: string;
    journeyDate: string;
    numberOfPassengers: number;
  } | null>(null);

  const handleSearchSubmit = (params: {
    sourceCity: string;
    destinationCity: string;
    journeyDate: string;
    numberOfPassengers: number;
  }) => {
    setSearchParams(params);
    setSearchState('results');
  };

  const handleBackToSearch = () => {
    setSearchState('form');
    setSearchParams(null);
  };

  return (
    <div className="train-search-page">
      {/* Hero Section */}
      {searchState === 'form' && (
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-12 px-4 rounded-b-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <TrainIcon size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Myanmar Railway Booking</h1>
                <p className="text-lg opacity-90 mt-2">Book your train tickets across Myanmar's beautiful railway network</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <SearchIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Easy Search</h3>
                    <p className="text-sm opacity-90">Find trains with just 3 clicks</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MapPinIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Route Details</h3>
                    <p className="text-sm opacity-90">See all stops along your journey</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <TrainIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Multiple Options</h3>
                    <p className="text-sm opacity-90">Choose from express, special & local trains</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {searchState === 'form' ? (
          <>
            {/* Search Form */}
            <div className="mb-12">
              <EnhancedSearchForm onSearchSubmit={handleSearchSubmit} />
            </div>
            
            {/* Myanmar Railway Info */}
            <div className="mb-12">
              <MyanmarRailwayInfo />
            </div>
            
            {/* Popular Routes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Routes in Myanmar</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { from: 'Yangon', to: 'Mandalay', distance: '620km', duration: '10h 30m', price: '15,000 MMK' },
                  { from: 'Yangon', to: 'Naypyitaw', distance: '320km', duration: '4h', price: '8,000 MMK' },
                  { from: 'Yangon', to: 'Mawlamyine', distance: '300km', duration: '7h 30m', price: '12,000 MMK' },
                  { from: 'Mandalay', to: 'Myitkyina', distance: '780km', duration: '12h 30m', price: '18,000 MMK' },
                ].map((route, index) => (
                  <div key={index} className="bg-slate-50 rounded-xl p-5 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-slate-900">{route.from} → {route.to}</div>
                        <div className="text-sm text-slate-600">{route.distance} • {route.duration}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <TrainIcon size={20} />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-emerald-700">{route.price}</div>
                    <div className="text-xs text-slate-500 mt-2">Starting price per passenger</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Search Results */
          <div>
            {searchParams && (
              <TrainSearchWithStops 
                searchParams={searchParams} 
                onBack={handleBackToSearch}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Myanmar Railway Booking</h3>
              <p className="text-slate-400">
                Official partner system for booking train tickets across Myanmar's railway network.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <div className="space-y-2 text-slate-400">
                <div>Phone: +95-1-XXXXXXX</div>
                <div>Email: info@myanmarrailways.gov.mm</div>
                <div>Website: ort.railways.gov.mm</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="text-slate-400 hover:text-white transition-colors block">Popular Routes</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors block">Train Schedules</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors block">Fare Calculator</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors block">Help Center</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>© 2026 Myanmar Railway Booking System. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style>{`
        .train-search-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
        }
        
        @media (max-width: 768px) {
          .train-search-page .hero-section h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}