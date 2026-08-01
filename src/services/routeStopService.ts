// Route Stop Service for Myanmar Railway Booking Frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface RouteStop {
  id: number;
  routeId: number;
  routeCode: string;
  routeName: string;
  station: Station;
  stopOrder: number;
  distanceFromStart: number; // km
  estimatedArrivalOffset: number; // minutes from route start
  estimatedDepartureOffset: number; // minutes from route start
  stopDuration: number; // minutes
  platformNumber?: string;
  isIntermediateStop: boolean;
  stopType: string;
  facilitiesAvailable?: string;
  status: string;
  stopFareFromStart?: number;
  
  // Calculated fields
  calculatedArrivalTime?: string;
  calculatedDepartureTime?: string;
  isStartStation?: boolean;
  isEndStation?: boolean;
  stopInfo?: string;
}

export interface Station {
  id: number;
  code: string;
  name: string;
  city: string;
  state: string;
  platformCount?: string;
  facilities?: string;
}

export interface RouteStopRequest {
  routeId: number;
  station: Station;
  stopOrder: number;
  distanceFromStart: number;
  estimatedArrivalOffset: number;
  estimatedDepartureOffset: number;
  stopDuration: number;
  platformNumber?: string;
  isIntermediateStop: boolean;
  stopType: string;
  facilitiesAvailable?: string;
  status: string;
  stopFareFromStart?: number;
}

class RouteStopService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Get all route stops for a specific route
  async getRouteStopsByRouteId(routeId: number): Promise<RouteStop[]> {
    const response = await fetch(`${this.baseUrl}/route-stops/route/${routeId}`);
    return response.json();
  }

  // Get active route stops for a route
  async getActiveRouteStopsByRouteId(routeId: number): Promise<RouteStop[]> {
    const response = await fetch(`${this.baseUrl}/route-stops/route/${routeId}/active`);
    return response.json();
  }

  // Get route stops between two stations on a route
  async getStopsBetweenStations(routeId: number, startStationId: number, endStationId: number): Promise<RouteStop[]> {
    const response = await fetch(
      `${this.baseUrl}/route-stops/route/${routeId}/between-stations?startStationId=${startStationId}&endStationId=${endStationId}`
    );
    return response.json();
  }

  // Get route stops by station
  async getRouteStopsByStationId(stationId: number): Promise<RouteStop[]> {
    const response = await fetch(`${this.baseUrl}/route-stops/station/${stationId}`);
    return response.json();
  }

  // Get route stops by range
  async getRouteStopsByRange(routeId: number, startOrder: number, endOrder: number): Promise<RouteStop[]> {
    const response = await fetch(
      `${this.baseUrl}/route-stops/route/${routeId}/range?startOrder=${startOrder}&endOrder=${endOrder}`
    );
    return response.json();
  }

  // Generate route stops for a route
  async generateRouteStops(routeId: number, routeStartTime?: string): Promise<RouteStop[]> {
    const url = routeStartTime 
      ? `${this.baseUrl}/route-stops/route/${routeId}/generate?routeStartTime=${encodeURIComponent(routeStartTime)}`
      : `${this.baseUrl}/route-stops/route/${routeId}/generate`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  // Create a new route stop
  async createRouteStop(routeStopRequest: RouteStopRequest): Promise<RouteStop> {
    const response = await fetch(`${this.baseUrl}/route-stops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeStopRequest),
    });
    return response.json();
  }

  // Update a route stop
  async updateRouteStop(id: number, routeStopRequest: RouteStopRequest): Promise<RouteStop> {
    const response = await fetch(`${this.baseUrl}/route-stops/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeStopRequest),
    });
    return response.json();
  }

  // Delete a route stop
  async deleteRouteStop(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/route-stops/${id}`, {
      method: 'DELETE',
    });
  }

  // Search route stops
  async searchRouteStops(params: {
    routeId?: number;
    stationId?: number;
    stopType?: string;
    status?: string;
  }): Promise<RouteStop[]> {
    const queryParams = new URLSearchParams();
    
    if (params.routeId) queryParams.append('routeId', params.routeId.toString());
    if (params.stationId) queryParams.append('stationId', params.stationId.toString());
    if (params.stopType) queryParams.append('stopType', params.stopType);
    if (params.status) queryParams.append('status', params.status);
    
    const response = await fetch(`${this.baseUrl}/route-stops/search?${queryParams.toString()}`);
    return response.json();
  }

  // Utility methods
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    } else {
      return `${mins}m`;
    }
  }

  formatDistance(km: number): string {
    return `${km} km`;
  }

  calculateProgress(currentStopOrder: number, totalStops: number): number {
    if (totalStops <= 1) return 0;
    return ((currentStopOrder - 1) / (totalStops - 1)) * 100;
  }

  getStopStatusColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      case 'TEMPORARILY_CLOSED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

  getStopTypeColor(stopType: string): string {
    switch (stopType.toUpperCase()) {
      case 'TERMINAL':
        return 'bg-purple-100 text-purple-800';
      case 'MAJOR':
        return 'bg-blue-100 text-blue-800';
      case 'REGULAR':
        return 'bg-green-100 text-green-800';
      case 'TECHNICAL':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Mock data for development
  static getMockRouteStops(): RouteStop[] {
    return [
      {
        id: 1,
        routeId: 1,
        routeCode: 'YGN-MDY-01',
        routeName: 'Yangon-Mandalay Express',
        station: {
          id: 1,
          code: 'YGN',
          name: 'Yangon Central Railway Station',
          city: 'Yangon',
          state: 'Yangon Region',
          platformCount: '8',
          facilities: 'Waiting rooms, AC lounge, Food court, Bookstore, ATMs'
        },
        stopOrder: 1,
        distanceFromStart: 0,
        estimatedArrivalOffset: 0,
        estimatedDepartureOffset: 0,
        stopDuration: 0,
        isIntermediateStop: false,
        stopType: 'TERMINAL',
        facilitiesAvailable: 'All facilities',
        status: 'ACTIVE',
        stopFareFromStart: 0,
        isStartStation: true,
        stopInfo: 'Start: Yangon Central Station'
      },
      {
        id: 2,
        routeId: 1,
        routeCode: 'YGN-MDY-01',
        routeName: 'Yangon-Mandalay Express',
        station: {
          id: 2,
          code: 'BGN',
          name: 'Bago Railway Station',
          city: 'Bago',
          state: 'Bago Region',
          platformCount: '3',
          facilities: 'Waiting room, Snack shop'
        },
        stopOrder: 2,
        distanceFromStart: 80,
        estimatedArrivalOffset: 120,
        estimatedDepartureOffset: 125,
        stopDuration: 5,
        platformNumber: '2',
        isIntermediateStop: true,
        stopType: 'MAJOR',
        facilitiesAvailable: 'Waiting room, Snack shop',
        status: 'ACTIVE',
        stopFareFromStart: 5000,
        stopInfo: 'Stop #2: Bago Station - Arrival: +120 min, Stop: 5 min'
      },
      {
        id: 3,
        routeId: 1,
        routeCode: 'YGN-MDY-01',
        routeName: 'Yangon-Mandalay Express',
        station: {
          id: 3,
          code: 'PYM',
          name: 'Pyay Railway Station',
          city: 'Pyay',
          state: 'Bago Region',
          platformCount: '2',
          facilities: 'Basic waiting area'
        },
        stopOrder: 3,
        distanceFromStart: 180,
        estimatedArrivalOffset: 240,
        estimatedDepartureOffset: 245,
        stopDuration: 5,
        platformNumber: '1',
        isIntermediateStop: true,
        stopType: 'REGULAR',
        facilitiesAvailable: 'Basic waiting area',
        status: 'ACTIVE',
        stopFareFromStart: 12000,
        stopInfo: 'Stop #3: Pyay Station - Arrival: +240 min, Stop: 5 min'
      },
      {
        id: 4,
        routeId: 1,
        routeCode: 'YGN-MDY-01',
        routeName: 'Yangon-Mandalay Express',
        station: {
          id: 4,
          code: 'NPT',
          name: 'Naypyitaw Railway Station',
          city: 'Naypyitaw',
          state: 'Naypyidaw Union Territory',
          platformCount: '6',
          facilities: 'Modern waiting areas, Food court'
        },
        stopOrder: 4,
        distanceFromStart: 320,
        estimatedArrivalOffset: 420,
        estimatedDepartureOffset: 430,
        stopDuration: 10,
        platformNumber: '3',
        isIntermediateStop: true,
        stopType: 'MAJOR',
        facilitiesAvailable: 'Modern waiting areas, Food court',
        status: 'ACTIVE',
        stopFareFromStart: 20000,
        stopInfo: 'Stop #4: Naypyitaw Station - Arrival: +420 min, Stop: 10 min'
      },
      {
        id: 5,
        routeId: 1,
        routeCode: 'YGN-MDY-01',
        routeName: 'Yangon-Mandalay Express',
        station: {
          id: 5,
          code: 'MDY',
          name: 'Mandalay Central Railway Station',
          city: 'Mandalay',
          state: 'Mandalay Region',
          platformCount: '5',
          facilities: 'AC waiting rooms, Restaurants'
        },
        stopOrder: 5,
        distanceFromStart: 500,
        estimatedArrivalOffset: 630,
        estimatedDepartureOffset: 630,
        stopDuration: 0,
        isIntermediateStop: false,
        stopType: 'TERMINAL',
        facilitiesAvailable: 'AC waiting rooms, Restaurants',
        status: 'ACTIVE',
        stopFareFromStart: 30000,
        isEndStation: true,
        stopInfo: 'End: Mandalay Central Station'
      }
    ];
  }
}

export const routeStopService = new RouteStopService();