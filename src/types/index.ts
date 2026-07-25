export type AppView = 'booking' | 'register' | 'profile'

export type BookingStep =
  | 'search'
  | 'results'
  | 'seats'
  | 'verification'
  | 'passengers'
  | 'payment'
  | 'confirmation'

export type ClassType =
  | 'first-1'   // First Class 1 – AC, reclining seats (premium)
  | 'first-2'   // First Class 2 – AC, standard seats
  | 'upper-1'   // Upper Class 1 – fan-cooled, cushioned assigned seats
  | 'upper-2'   // Upper Class 2 – fan-cooled, standard assigned seats
  | 'sleeper'   // Sleeper berths (overnight trains)
  | 'ordinary'  // Ordinary Class – bench seats, no assignment

export type SeatStatus = 'available' | 'selected' | 'booked'

export type TicketStatus = 'active' | 'past'

export interface Station {
  id: string
  name: string
  nameMm: string
}

export interface TrainClass {
  type: ClassType
  label: string
  price: number
  availableSeats: number
}

export interface TrainStop {
  stationId: string
  arrivalTime: string | null   // null for the first station
  departureTime: string | null // null for the last station
  stopDuration?: string        // e.g. "5 min"
}

export interface Train {
  id: string
  name: string
  number: string
  fromStationId: string
  toStationId: string
  departureTime: string
  arrivalTime: string
  duration: string
  classes: TrainClass[]
  stops: TrainStop[]
}

export interface Seat {
  id: string
  row: number
  column: string
  status: SeatStatus
}

export type TripType = 'one-way' | 'round-trip'

export interface SearchQuery {
  fromStationId: string
  toStationId: string
  departureDate: string
  returnDate?: string
  passengerCount: number
  tripType: TripType
}

export interface Passenger {
  name: string
  nrc: string
}

export interface VerifiedUser {
  name: string
  nrc: string
  verifiedAt: string
}

export interface UserProfile {
  id: string
  fullName: string
  phone: string
  nrc: string
  createdAt: string
}

export type PaymentMethod = 'kbzpay' | 'cbpay' | 'mmqr'

export interface BookingTicket {
  id: string
  reference: string
  train: Train
  searchQuery: SearchQuery
  classType: ClassType
  seats: string[]
  passengers: Passenger[]
  paymentMethod: PaymentMethod
  totalPrice: number
  bookedAt: string
  status: TicketStatus
}
