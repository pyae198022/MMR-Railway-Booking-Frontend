import { useState, useEffect } from 'react';
import { routeStopService, RouteStop } from '../services/routeStopService';

export function useRouteStops(routeId?: number) {
  const [routeStops, setRouteStops] = useState<RouteStop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRouteStops = async (id?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      let stops: RouteStop[];
      
      if (id) {
        // Try to fetch from API
        try {
          stops = await routeStopService.getRouteStopsByRouteId(id);
        } catch (apiError) {
          console.warn('API fetch failed, using mock data:', apiError);
          // Fallback to mock data if API fails
          stops = routeStopService.getMockRouteStops().filter(stop => stop.routeId === id);
        }
      } else {
        // Use mock data when no routeId provided
        stops = routeStopService.getMockRouteStops();
      }
      
      // Sort by stop order
      stops.sort((a, b) => a.stopOrder - b.stopOrder);
      setRouteStops(stops);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch route stops';
      setError(errorMessage);
      console.error('Route stops fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStopsBetweenStations = async (routeId: number, startStationId: number, endStationId: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const stops = await routeStopService.getStopsBetweenStations(routeId, startStationId, endStationId);
      stops.sort((a, b) => a.stopOrder - b.stopOrder);
      setRouteStops(stops);
      return stops;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stops between stations';
      setError(errorMessage);
      console.error('Stops between stations fetch failed:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchStopsByStation = async (stationId: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const stops = await routeStopService.getRouteStopsByStationId(stationId);
      setRouteStops(stops);
      return stops;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stops by station';
      setError(errorMessage);
      console.error('Stops by station fetch failed:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const generateRouteStops = async (routeId: number, routeStartTime?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const generatedStops = await routeStopService.generateRouteStops(routeId, routeStartTime);
      generatedStops.sort((a, b) => a.stopOrder - b.stopOrder);
      setRouteStops(generatedStops);
      return generatedStops;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate route stops';
      setError(errorMessage);
      console.error('Route stops generation failed:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routeId) {
      fetchRouteStops(routeId);
    }
  }, [routeId]);

  const getStopByOrder = (order: number): RouteStop | undefined => {
    return routeStops.find(stop => stop.stopOrder === order);
  };

  const getStationByOrder = (order: number) => {
    const stop = getStopByOrder(order);
    return stop ? stop.station : undefined;
  };

  const getProgressPercentage = (currentStopOrder: number): number => {
    if (routeStops.length <= 1) return 0;
    return routeStopService.calculateProgress(currentStopOrder, routeStops.length);
  };

  const getDurationBetweenStops = (startOrder: number, endOrder: number): number => {
    const startStop = getStopByOrder(startOrder);
    const endStop = getStopByOrder(endOrder);
    
    if (!startStop || !endStop) return 0;
    
    return endStop.estimatedArrivalOffset - startStop.estimatedDepartureOffset;
  };

  const getDistanceBetweenStops = (startOrder: number, endOrder: number): number => {
    const startStop = getStopByOrder(startOrder);
    const endStop = getStopByOrder(endOrder);
    
    if (!startStop || !endStop) return 0;
    
    return endStop.distanceFromStart - startStop.distanceFromStart;
  };

  const getFareBetweenStops = (startOrder: number, endOrder: number): number => {
    const startStop = getStopByOrder(startOrder);
    const endStop = getStopByOrder(endOrder);
    
    if (!startStop || !endStop || !startStop.stopFareFromStart || !endStop.stopFareFromStart) {
      return 0;
    }
    
    return endStop.stopFareFromStart - startStop.stopFareFromStart;
  };

  const getNextStop = (currentOrder: number): RouteStop | undefined => {
    return routeStops.find(stop => stop.stopOrder === currentOrder + 1);
  };

  const getPreviousStop = (currentOrder: number): RouteStop | undefined => {
    return routeStops.find(stop => stop.stopOrder === currentOrder - 1);
  };

  const getIntermediateStops = (): RouteStop[] => {
    return routeStops.filter(stop => stop.isIntermediateStop);
  };

  const getTerminalStops = (): RouteStop[] => {
    return routeStops.filter(stop => !stop.isIntermediateStop);
  };

  const findStopByStationId = (stationId: number): RouteStop | undefined => {
    return routeStops.find(stop => stop.station.id === stationId);
  };

  const findStopByStationCode = (stationCode: string): RouteStop | undefined => {
    return routeStops.find(stop => stop.station.code === stationCode);
  };

  return {
    routeStops,
    loading,
    error,
    refetch: () => routeId && fetchRouteStops(routeId),
    fetchStopsBetweenStations,
    fetchStopsByStation,
    generateRouteStops,
    getStopByOrder,
    getStationByOrder,
    getProgressPercentage,
    getDurationBetweenStops,
    getDistanceBetweenStops,
    getFareBetweenStops,
    getNextStop,
    getPreviousStop,
    getIntermediateStops,
    getTerminalStops,
    findStopByStationId,
    findStopByStationCode,
    totalStops: routeStops.length,
    hasStops: routeStops.length > 0,
    startStation: routeStops[0]?.station,
    endStation: routeStops[routeStops.length - 1]?.station,
    totalDistance: routeStops.length > 0 
      ? routeStops[routeStops.length - 1].distanceFromStart 
      : 0,
    totalDuration: routeStops.length > 0
      ? routeStops[routeStops.length - 1].estimatedArrivalOffset
      : 0,
  };
}