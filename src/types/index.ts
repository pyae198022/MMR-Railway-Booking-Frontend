export type AppView = 'booking' | 'register' | 'profile'

export type BookingStep =
  | 'search'
  | 'results'
  | 'seats'
  | 'verification'
  | 'passengers'
  | 'payment'
  | 'confirmation'

export type ClassType = 'upper' | 'ordinary'

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
}

export interface Seat {
  id: string
  row: number
  column: string
  status: SeatStatus
}

export interface SearchQuery {
  fromStationId: string
  toStationId: string
  departureDate: string
  passengerCount: number
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
