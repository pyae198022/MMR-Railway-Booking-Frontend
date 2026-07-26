import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Station, Train, TrainSearchRequest, TrainSearchResponse, BookingRequest, BookingResponse } from '../services/api';

export function useApiHealth() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const healthData = await apiService.checkHealth();
        setHealth(healthData);
      } catch (err) {
        setError('Unable to connect to backend API');
        console.error('Health check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return { health, loading, error };
}

export function useStations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllStations();
      setStations(data);
    } catch (err) {
      setError('Failed to fetch stations');
      console.error('Stations fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return { stations, loading, error, refetch: fetchStations };
}

export function useTrains() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllTrains();
      setTrains(data);
    } catch (err) {
      setError('Failed to fetch trains');
      console.error('Trains fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  return { trains, loading, error, refetch: fetchTrains };
}

export function useTrainSearch(searchRequest: TrainSearchRequest | null) {
  const [searchResults, setSearchResults] = useState<TrainSearchResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTrains = async (request: TrainSearchRequest) => {
    try {
      setLoading(true);
      setError(null);
      const results = await apiService.searchTrains(request);
      setSearchResults(results);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search trains';
      setError(errorMessage);
      console.error('Train search failed:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchRequest) {
      searchTrains(searchRequest);
    }
  }, [searchRequest]);

  return { searchResults, loading, error, searchTrains };
}

export function useBooking() {
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingRequest: BookingRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newBooking = await apiService.createBooking(bookingRequest);
      setBooking(newBooking);
      return newBooking;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
      setError(errorMessage);
      console.error('Booking creation failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookingByPnr = async (pnrNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      const bookingData = await apiService.getBookingByPnr(pnrNumber);
      setBooking(bookingData);
      return bookingData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch booking';
      setError(errorMessage);
      console.error('Booking fetch failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: number) => {
    try {
      setLoading(true);
      setError(null);
      const cancelledBooking = await apiService.cancelBooking(bookingId);
      setBooking(cancelledBooking);
      return cancelledBooking;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel booking';
      setError(errorMessage);
      console.error('Booking cancellation failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    booking,
    loading,
    error,
    createBooking,
    getBookingByPnr,
    cancelBooking,
    clearBooking: () => setBooking(null),
  };
}

export function useBackendAvailability() {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const available = await apiService.isBackendAvailable();
        setIsAvailable(available);
      } catch (err) {
        setIsAvailable(false);
        console.error('Backend availability check failed:', err);
      } finally {
        setChecking(false);
      }
    };

    checkAvailability();
    
    // Check every 30 seconds
    const interval = setInterval(checkAvailability, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { isAvailable, checking };
}