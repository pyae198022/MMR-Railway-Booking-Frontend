import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { generateCoachSeats, searchTrains } from '../data/mockData'
import type {
  AppView,
  BookingStep,
  BookingTicket,
  ClassType,
  Passenger,
  PaymentMethod,
  SearchQuery,
  Seat,
  Train,
  VerifiedUser,
} from '../types'
import {
  RESERVATION_DURATION_MS,
  addTicketToHistory,
  getTicketStatus,
  loadBookingHistory,
  saveBookingHistory,
} from '../utils/bookingStorage'

interface BookingContextValue {
  appView: AppView
  step: BookingStep
  searchQuery: SearchQuery | null
  searchResults: Train[]
  selectedTrain: Train | null
  selectedClass: ClassType | null
  seats: Seat[]
  selectedSeats: string[]
  verifiedUser: VerifiedUser | null
  passengers: Passenger[]
  paymentMethod: PaymentMethod | null
  ticket: BookingTicket | null
  bookingHistory: BookingTicket[]
  isProcessingPayment: boolean
  reservationExpiresAt: number | null
  reservationSecondsLeft: number
  reservationExpired: boolean
  setAppView: (view: AppView) => void
  setSearchQuery: (query: SearchQuery) => void
  selectTrain: (train: Train, classType: ClassType) => void
  toggleSeat: (seatId: string) => void
  setVerifiedUser: (user: VerifiedUser) => void
  setPassengers: (passengers: Passenger[]) => void
  setPaymentMethod: (method: PaymentMethod) => void
  processPayment: () => Promise<void>
  goToStep: (step: BookingStep) => void
  resetBooking: () => void
  totalPrice: number
  canProceedFromSeats: boolean
}

const BookingContext = createContext<BookingContextValue | null>(null)

const defaultSearch: SearchQuery = {
  fromStationId: 'ygn',
  toStationId: 'mdy',
  departureDate: new Date().toISOString().split('T')[0],
  passengerCount: 1,
}

function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'MMR-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

function generateTicketId(): string {
  return `tkt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [appView, setAppViewState] = useState<AppView>('booking')
  const [step, setStep] = useState<BookingStep>('search')
  const [searchQuery, setSearchQueryState] = useState<SearchQuery | null>(null)
  const [searchResults, setSearchResults] = useState<Train[]>([])
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null)
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null)
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [verifiedUser, setVerifiedUserState] = useState<VerifiedUser | null>(null)
  const [passengers, setPassengersState] = useState<Passenger[]>([])
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod | null>(null)
  const [ticket, setTicket] = useState<BookingTicket | null>(null)
  const [bookingHistory, setBookingHistory] = useState<BookingTicket[]>(() =>
    loadBookingHistory(),
  )
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [reservationExpiresAt, setReservationExpiresAt] = useState<number | null>(null)
  const [reservationSecondsLeft, setReservationSecondsLeft] = useState(0)

  useEffect(() => {
    saveBookingHistory(bookingHistory)
  }, [bookingHistory])

  useEffect(() => {
    if (!reservationExpiresAt || step !== 'payment') return

    const tick = () => {
      const left = Math.max(0, Math.floor((reservationExpiresAt - Date.now()) / 1000))
      setReservationSecondsLeft(left)
    }

    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [reservationExpiresAt, step])

  const reservationExpired = reservationSecondsLeft <= 0 && reservationExpiresAt !== null

  const setAppView = useCallback((view: AppView) => {
    setAppViewState(view)
  }, [])

  const setSearchQuery = useCallback((query: SearchQuery) => {
    setSearchQueryState(query)
    const results = searchTrains(query.fromStationId, query.toStationId)
    setSearchResults(results)
    setStep('results')
  }, [])

  const selectTrain = useCallback((train: Train, classType: ClassType) => {
    setSelectedTrain(train)
    setSelectedClass(classType)
    setSeats(generateCoachSeats(train.id, classType))
    setSelectedSeats([])
    setStep('seats')
  }, [])

  const toggleSeat = useCallback(
    (seatId: string) => {
      const seat = seats.find((s) => s.id === seatId)
      if (!seat || seat.status === 'booked') return

      const maxSeats = searchQuery?.passengerCount ?? 1
      const isSelected = selectedSeats.includes(seatId)

      if (isSelected) {
        setSelectedSeats((prev) => prev.filter((id) => id !== seatId))
        setSeats((prev) =>
          prev.map((s) => (s.id === seatId ? { ...s, status: 'available' } : s)),
        )
      } else if (selectedSeats.length < maxSeats) {
        setSelectedSeats((prev) => [...prev, seatId])
        setSeats((prev) =>
          prev.map((s) => (s.id === seatId ? { ...s, status: 'selected' } : s)),
        )
      }
    },
    [seats, selectedSeats, searchQuery],
  )

  const setVerifiedUser = useCallback((user: VerifiedUser) => {
    setVerifiedUserState(user)
  }, [])

  const setPassengers = useCallback((p: Passenger[]) => {
    setPassengersState(p)
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setPaymentMethodState(method)
  }, [])

  const totalPrice = useMemo(() => {
    if (!selectedTrain || !selectedClass) return 0
    const classInfo = selectedTrain.classes.find((c) => c.type === selectedClass)
    const pricePerSeat = classInfo?.price ?? 0
    const count = selectedSeats.length || searchQuery?.passengerCount || 1
    return pricePerSeat * count
  }, [selectedTrain, selectedClass, selectedSeats, searchQuery])

  const canProceedFromSeats = useMemo(() => {
    const required = searchQuery?.passengerCount ?? 1
    return selectedSeats.length === required
  }, [selectedSeats, searchQuery])

  const goToStep = useCallback(
    (nextStep: BookingStep) => {
      if (nextStep === 'payment') {
        setReservationExpiresAt(Date.now() + RESERVATION_DURATION_MS)
        setReservationSecondsLeft(Math.floor(RESERVATION_DURATION_MS / 1000))
      }
      setStep(nextStep)
    },
    [],
  )

  const processPayment = useCallback(async () => {
    if (
      !selectedTrain ||
      !selectedClass ||
      !searchQuery ||
      !paymentMethod ||
      reservationExpired
    ) {
      return
    }

    setIsProcessingPayment(true)
    await new Promise((resolve) => setTimeout(resolve, 1800))

    const departureDate = searchQuery.departureDate
    const newTicket: BookingTicket = {
      id: generateTicketId(),
      reference: generateReference(),
      train: selectedTrain,
      searchQuery,
      classType: selectedClass,
      seats: selectedSeats,
      passengers,
      paymentMethod,
      totalPrice,
      bookedAt: new Date().toISOString(),
      status: getTicketStatus(departureDate),
    }

    setTicket(newTicket)
    setBookingHistory((prev) => addTicketToHistory(prev, newTicket))
    setIsProcessingPayment(false)
    setReservationExpiresAt(null)
    setStep('confirmation')
  }, [
    selectedTrain,
    selectedClass,
    searchQuery,
    paymentMethod,
    selectedSeats,
    passengers,
    totalPrice,
    reservationExpired,
  ])

  const resetBooking = useCallback(() => {
    setStep('search')
    setSearchQueryState(null)
    setSearchResults([])
    setSelectedTrain(null)
    setSelectedClass(null)
    setSeats([])
    setSelectedSeats([])
    setVerifiedUserState(null)
    setPassengersState([])
    setPaymentMethodState(null)
    setTicket(null)
    setIsProcessingPayment(false)
    setReservationExpiresAt(null)
    setReservationSecondsLeft(0)
  }, [])

  const value = useMemo(
    () => ({
      appView,
      step,
      searchQuery,
      searchResults,
      selectedTrain,
      selectedClass,
      seats,
      selectedSeats,
      verifiedUser,
      passengers,
      paymentMethod,
      ticket,
      bookingHistory,
      isProcessingPayment,
      reservationExpiresAt,
      reservationSecondsLeft,
      reservationExpired,
      setAppView,
      setSearchQuery,
      selectTrain,
      toggleSeat,
      setVerifiedUser,
      setPassengers,
      setPaymentMethod,
      processPayment,
      goToStep,
      resetBooking,
      totalPrice,
      canProceedFromSeats,
    }),
    [
      appView,
      step,
      searchQuery,
      searchResults,
      selectedTrain,
      selectedClass,
      seats,
      selectedSeats,
      verifiedUser,
      passengers,
      paymentMethod,
      ticket,
      bookingHistory,
      isProcessingPayment,
      reservationExpiresAt,
      reservationSecondsLeft,
      reservationExpired,
      setAppView,
      setSearchQuery,
      selectTrain,
      toggleSeat,
      setVerifiedUser,
      setPassengers,
      setPaymentMethod,
      processPayment,
      goToStep,
      resetBooking,
      totalPrice,
      canProceedFromSeats,
    ],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}

export { defaultSearch }
