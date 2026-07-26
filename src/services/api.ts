// API Service for connecting to Myanmar Railway Booking Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface Station {
  id: number;
  code: string;
  name: string;
  city: string;
  state: string;
  platformCount?: string;
  facilities?: string;
}

export interface Train {
  id: number;
  trainNumber: string;
  trainName: string;
  sourceStation: Station;
  destinationStation: Station;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  availableSeats: number;
  basePrice: number;
  trainType: string;
  status: string;
  travelDuration?: number;
  calculatedPrice?: number;
}

export interface TrainSearchRequest {
  sourceCity: string;
  destinationCity: string;
  journeyDate: string;
  numberOfPassengers?: number;
  trainType?: string;
  coachType?: string;
}

export interface TrainSearchResponse {
  train: Train;
  availableSeats: any[];
  totalAvailableSeatsPrice: number;
  travelDuration: string;
  hasEnoughSeats: boolean;
}

export interface BookingRequest {
  trainId: number;
  userId: number;
  sourceStationId: number;
  destinationStationId: number;
  journeyDate: string;
  passengers: PassengerRequest[];
  paymentMethod: string;
}

export interface PassengerRequest {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  idType: string;
  idNumber: string;
  dateOfBirth: string;
  berthPreference: string;
  seatId?: number;
}

export interface BookingResponse {
  id: number;
  pnrNumber: string;
  user: any;
  train: Train;
  sourceStation: Station;
  destinationStation: Station;
  bookingDate: string;
  journeyDate: string;
  numberOfPassengers: number;
  totalFare: number;
  taxAmount: number;
  grandTotal: number;
  bookingStatus: string;
  paymentStatus: string;
  passengers: any[];
  payment: any;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Health check
  async checkHealth(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }

  // Get API info
  async getApiInfo(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/info`);
    return response.json();
  }

  // Station APIs
  async getAllStations(): Promise<Station[]> {
    const response = await fetch(`${this.baseUrl}/stations`);
    return response.json();
  }

  async getStationById(id: number): Promise<Station> {
    const response = await fetch(`${this.baseUrl}/stations/${id}`);
    return response.json();
  }

  async searchStationsByName(name: string): Promise<Station[]> {
    const response = await fetch(`${this.baseUrl}/stations/search?name=${encodeURIComponent(name)}`);
    return response.json();
  }

  async getStationsByCity(city: string): Promise<Station[]> {
    const response = await fetch(`${this.baseUrl}/stations/city/${encodeURIComponent(city)}`);
    return response.json();
  }

  // Train APIs
  async getAllTrains(): Promise<Train[]> {
    const response = await fetch(`${this.baseUrl}/trains`);
    return response.json();
  }

  async getTrainById(id: number): Promise<Train> {
    const response = await fetch(`${this.baseUrl}/trains/${id}`);
    return response.json();
  }

  async searchTrains(searchRequest: TrainSearchRequest): Promise<TrainSearchResponse[]> {
    const response = await fetch(`${this.baseUrl}/trains/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchRequest),
    });
    return response.json();
  }

  async getActiveTrains(): Promise<Train[]> {
    const response = await fetch(`${this.baseUrl}/trains/active`);
    return response.json();
  }

  async getTrainsWithAvailableSeats(minSeats: number = 1): Promise<Train[]> {
    const response = await fetch(`${this.baseUrl}/trains/available-seats?minSeats=${minSeats}`);
    return response.json();
  }

  // Booking APIs
  async createBooking(bookingRequest: BookingRequest): Promise<BookingResponse> {
    const response = await fetch(`${this.baseUrl}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingRequest),
    });
    return response.json();
  }

  async getBookingByPnr(pnrNumber: string): Promise<BookingResponse> {
    const response = await fetch(`${this.baseUrl}/bookings/pnr/${encodeURIComponent(pnrNumber)}`);
    return response.json();
  }

  async getBookingById(id: number): Promise<BookingResponse> {
    const response = await fetch(`${this.baseUrl}/bookings/${id}`);
    return response.json();
  }

  async getBookingsByUserId(userId: number): Promise<BookingResponse[]> {
    const response = await fetch(`${this.baseUrl}/bookings/user/${userId}`);
    return response.json();
  }

  async cancelBooking(bookingId: number): Promise<BookingResponse> {
    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
    });
    return response.json();
  }

  async calculateFare(trainId: number, seatIds: number[]): Promise<number> {
    const seatIdsParam = seatIds.join(',');
    const response = await fetch(`${this.baseUrl}/bookings/calculate-fare?trainId=${trainId}&seatIds=${seatIdsParam}`, {
      method: 'POST',
    });
    return response.json();
  }

  // Utility methods
  async isBackendAvailable(): Promise<boolean> {
    try {
      await this.checkHealth();
      return true;
    } catch (error) {
      console.error('Backend not available:', error);
      return false;
    }
  }

  formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-MM', {
      style: 'currency',
      currency: 'MMK',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  formatDateTime(dateTime: string): string {
    return new Date(dateTime).toLocaleString('en-MM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

export const apiService = new ApiService();

// Mock data fallback for development
export const mockStations: Station[] = [
  { id: 1, code: 'YGN', name: 'Yangon Central Railway Station', city: 'Yangon', state: 'Yangon Region' },
  { id: 2, code: 'MDY', name: 'Mandalay Central Railway Station', city: 'Mandalay', state: 'Mandalay Region' },
  { id: 3, code: 'NPY', name: 'Naypyidaw Railway Station', city: 'Naypyidaw', state: 'Naypyidaw Union Territory' },
  { id: 4, code: 'BGN', name: 'Bagan Station', city: 'Bagan', state: 'Mandalay Region' },
  { id: 5, code: 'TGI', name: 'Taunggyi Station', city: 'Taunggyi', state: 'Shan State' },
  { id: 6, code: 'MLM', name: 'Mawlamyine Station', city: 'Mawlamyine', state: 'Mon State' },
];

export const mockTrains: Train[] = [
  {
    id: 1,
    trainNumber: 'UP01',
    trainName: 'Yangon-Mandalay Express',
    sourceStation: { id: 1, code: 'YGN', name: 'Yangon Central Railway Station', city: 'Yangon', state: 'Yangon Region' },
    destinationStation: { id: 2, code: 'MDY', name: 'Mandalay Central Railway Station', city: 'Mandalay', state: 'Mandalay Region' },
    departureTime: '2026-07-26T08:00:00',
    arrivalTime: '2026-07-26T18:30:00',
    totalSeats: 120,
    availableSeats: 95,
    basePrice: 15000,
    trainType: 'Express',
    status: 'ACTIVE',
    travelDuration: 630,
    calculatedPrice: 15000,
  },
  {
    id: 2,
    trainNumber: 'DN01',
    trainName: 'Mandalay-Yangon Express',
    sourceStation: { id: 2, code: 'MDY', name: 'Mandalay Central Railway Station', city: 'Mandalay', state: 'Mandalay Region' },
    destinationStation: { id: 1, code: 'YGN', name: 'Yangon Central Railway Station', city: 'Yangon', state: 'Yangon Region' },
    departureTime: '2026-07-26T07:30:00',
    arrivalTime: '2026-07-26T18:00:00',
    totalSeats: 120,
    availableSeats: 88,
    basePrice: 15000,
    trainType: 'Express',
    status: 'ACTIVE',
    travelDuration: 630,
    calculatedPrice: 15000,
  },
];