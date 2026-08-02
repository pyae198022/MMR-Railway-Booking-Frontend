import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { apiService } from '../services/api'
import { useTrainSearch } from '../hooks/useApi'
import { useLanguage } from './LanguageContext'
import { t, type TranslationKey } from '../i18n/translations'
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
  UserProfile,
  VerifiedUser,
} from '../types'
import type { TrainSearchRequest, TrainSearchResponse } from '../services/api'
import {
  RESERVATION_DURATION_MS,
  addTicketToHistory,
  getTicketStatus,
  loadBookingHistory,
  saveBookingHistory,
} from '../utils/bookingStorage'
import { localDateISO } from '../utils/date'
import { clearUserProfile, loadUserProfile, saveUserProfile } from '../utils/userStorage'

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
  userProfile: UserProfile | null
  passengers: Passenger[]
  paymentMethod: PaymentMethod | null
  ticket: BookingTicket | null
  bookingHistory: BookingTicket[]
  isProcessingPayment: boolean
  reservationExpiresAt: number | null
  reservationSecondsLeft: number
  reservationExpired: boolean
  searchErrorMsg: string | null
  searchLoading: boolean
  setAppView: (view: AppView) => void
  setSearchQuery: (query: SearchQuery) => void
  selectTrain: (train: Train, classType: ClassType) => void
  toggleSeat: (seatId: string) => void
  setVerifiedUser: (user: VerifiedUser) => void
  setPassengers: (passengers: Passenger[]) => void
  setPaymentMethod: (method: PaymentMethod) => void
  registerUser: (details: Pick<UserProfile, 'fullName' | 'phone' | 'nrc'>) => void
  updateUserProfile: (details: Pick<UserProfile, 'fullName' | 'phone' | 'nrc'>) => void
  logoutUser: () => void
  openTicketByReference: (reference: string) => boolean
  processPayment: () => Promise<void>
  goToStep: (step: BookingStep) => void
  resetBooking: () => void
  totalPrice: number
  canProceedFromSeats: boolean
}

const BookingContext = createContext<BookingContextValue | null>(null)

const defaultSearch: SearchQuery = {
  fromStationId: '1', // Yangon (YGN) - numeric ID from backend
  toStationId: '6',   // Mandalay (MDY) - numeric ID from backend
  departureDate: localDateISO(0), // Default to today
  passengerCount: 1,
  tripType: 'one-way',
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

function generateUserId(): string {
  return `usr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

// Convert backend train to frontend train format
function convertBackendTrainToFrontend(backendTrain: any): Train {
  // Backend train structure to frontend train structure conversion
  return {
    id: backendTrain.id || backendTrain.trainNumber,
    name: backendTrain.trainName || backendTrain.trainNumber,
    number: backendTrain.trainNumber,
    fromStationId: backendTrain.sourceStation?.id || '1',
    toStationId: backendTrain.destinationStation?.id || '6',
    departureTime: backendTrain.departureTime,
    arrivalTime: backendTrain.arrivalTime,
    duration: backendTrain.travelDuration ? `${Math.floor(backendTrain.travelDuration / 60)}h ${backendTrain.travelDuration % 60}m` : 'Unknown',
    classes: [
      { type: 'first-1', label: 'First Class 1', price: backendTrain.basePrice * 2, availableSeats: 10 },
      { type: 'first-2', label: 'First Class 2', price: backendTrain.basePrice * 1.5, availableSeats: 15 },
      { type: 'upper-1', label: 'Upper Class 1', price: backendTrain.basePrice, availableSeats: 20 },
      { type: 'upper-2', label: 'Upper Class 2', price: backendTrain.basePrice * 0.8, availableSeats: 25 },
      { type: 'ordinary', label: 'Ordinary Class', price: backendTrain.basePrice * 0.5, availableSeats: 40 },
    ],
    stops: [],
    // Backend fields
    trainNumber: backendTrain.trainNumber,
    trainName: backendTrain.trainName,
    sourceStation: backendTrain.sourceStation,
    destinationStation: backendTrain.destinationStation,
    totalSeats: backendTrain.totalSeats,
    availableSeats: backendTrain.availableSeats,
    basePrice: backendTrain.basePrice,
    trainType: backendTrain.trainType,
    status: backendTrain.status,
    travelDuration: backendTrain.travelDuration,
    calculatedPrice: backendTrain.calculatedPrice,
  }
}

// Generate mock seats for a train (to be replaced with real seat data from backend)
function generateCoachSeats(trainId: string | number, classType: string): Seat[] {
  const seats: Seat[] = []
  const rows = 10
  const columns = ['A', 'B', 'C', 'D']
  
  for (let row = 1; row <= rows; row++) {
    for (const column of columns) {
      const id = `${trainId}-${classType}-${row}${column}`
      const isBooked = Math.random() > 0.7 // Random booking status
      seats.push({
        id,
        row,
        column,
        status: isBooked ? 'booked' : 'available',
      })
    }
  }
  
  return seats
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => loadUserProfile())
  const [passengers, setPassengersState] = useState<Passenger[]>([])
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod | null>(null)
  const [ticket, setTicket] = useState<BookingTicket | null>(null)
  const [bookingHistory, setBookingHistory] = useState<BookingTicket[]>(() =>
    loadBookingHistory(),
  )
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [reservationExpiresAt, setReservationExpiresAt] = useState<number | null>(null)
  const [reservationSecondsLeft, setReservationSecondsLeft] = useState(0)
  const [searchErrorMsg, setSearchErrorMsg] = useState<string | null>(null)
  
  // Get current language for translations
  const { lang } = useLanguage()
  
  // API search state
  const [apiSearchRequest, setApiSearchRequest] = useState<TrainSearchRequest | null>(null)
  const { searchResults: apiSearchResults, loading: searchLoading, error: searchError } = useTrainSearch(apiSearchRequest)

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

  // Convert API search results to frontend train format
  useEffect(() => {
    // Only process results if a search was actually performed (apiSearchRequest is not null)
    if (!apiSearchRequest) {
      return; // No search performed yet
    }
    
    if (apiSearchResults && apiSearchResults.length > 0) {
      const convertedTrains = apiSearchResults.map(result => 
        convertBackendTrainToFrontend(result.train)
      )
      setSearchResults(convertedTrains)
      setStep('results')
      setSearchErrorMsg(null) // Clear any error if we found results
    } else if (searchError) {
      console.error('API search failed:', searchError)
      setSearchErrorMsg(t('search_failed', lang))
    } else if (apiSearchResults && apiSearchResults.length === 0) {
      // No trains found - stay on search page and clear any previous results
      setSearchResults([])
      setSearchErrorMsg(t('search_no_trains_found', lang))
      // Don't change step - stay on search page
    }
  }, [apiSearchResults, searchError, apiSearchRequest, lang])

  const setAppView = useCallback((view: AppView) => {
    setAppViewState(view)
  }, [])

  const setSearchQuery = useCallback((query: SearchQuery) => {
    setSearchQueryState(query)
    setSearchErrorMsg(null) // Clear any previous search error
    setStep('search') // Always go back to search page when initiating a new search
    
    // Prepare API search request
    if (query.sourceCity && query.destinationCity && query.journeyDate) {
      const apiRequest: TrainSearchRequest = {
        sourceCity: query.sourceCity,
        destinationCity: query.destinationCity,
        journeyDate: query.journeyDate,
        numberOfPassengers: query.numberOfPassengers || query.passengerCount
      }
      setApiSearchRequest(apiRequest)
    } else {
      // If required fields are missing, clear search results
      setSearchResults([])
      setStep('results')
    }
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

  const registerUser = useCallback(
    (details: Pick<UserProfile, 'fullName' | 'phone' | 'nrc'>) => {
      const profile: UserProfile = {
        id: userProfile?.id ?? generateUserId(),
        ...details,
        createdAt: userProfile?.createdAt ?? new Date().toISOString(),
      }
      setUserProfile(profile)
      saveUserProfile(profile)
      setAppViewState('profile')
    },
    [userProfile],
  )

  const updateUserProfile = useCallback(
    (details: Pick<UserProfile, 'fullName' | 'phone' | 'nrc'>) => {
      setUserProfile((currentProfile) => {
        if (!currentProfile) return currentProfile

        const profile = { ...currentProfile, ...details }
        saveUserProfile(profile)
        return profile
      })
    },
    [],
  )

  const logoutUser = useCallback(() => {
    clearUserProfile()
    setUserProfile(null)
    setAppViewState('booking')
  }, [])

  const openTicketByReference = useCallback(
    (reference: string) => {
      const normalizedReference = reference.trim().toUpperCase()
      const matchingTicket = bookingHistory.find(
        (historyTicket) => historyTicket.reference.toUpperCase() === normalizedReference,
      )

      if (!matchingTicket) return false

      setTicket(matchingTicket)
      setAppViewState('booking')
      setStep('confirmation')
      return true
    },
    [bookingHistory],
  )

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
      } else if (nextStep === 'seats' && reservationExpired) {
        setSeats((previousSeats) =>
          previousSeats.map((seat) =>
            seat.status === 'selected' ? { ...seat, status: 'available' } : seat,
          ),
        )
        setSelectedSeats([])
        setPaymentMethodState(null)
        setReservationExpiresAt(null)
        setReservationSecondsLeft(0)
      }
      setStep(nextStep)
    },
    [reservationExpired],
  )

  const processPayment = useCallback(async () => {
    if (
      !selectedTrain ||
      !selectedClass ||
      !searchQuery ||
      !paymentMethod ||
      !reservationExpiresAt ||
      reservationExpired ||
      Date.now() >= reservationExpiresAt
    ) {
      return
    }

    setIsProcessingPayment(true)
    await new Promise((resolve) => setTimeout(resolve, 1800))

    if (Date.now() >= reservationExpiresAt) {
      setIsProcessingPayment(false)
      setReservationSecondsLeft(0)
      return
    }

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
    reservationExpiresAt,
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
    setApiSearchRequest(null)
    setSearchErrorMsg(null) // Clear search error
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
      userProfile,
      passengers,
      paymentMethod,
      ticket,
      bookingHistory,
      isProcessingPayment,
      reservationExpiresAt,
      reservationSecondsLeft,
      reservationExpired,
      searchErrorMsg,
      searchLoading,
      setAppView,
      setSearchQuery,
      selectTrain,
      toggleSeat,
      setVerifiedUser,
      setPassengers,
      setPaymentMethod,
      registerUser,
      updateUserProfile,
      logoutUser,
      openTicketByReference,
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
      userProfile,
      passengers,
      paymentMethod,
      ticket,
      bookingHistory,
      isProcessingPayment,
      reservationExpiresAt,
      reservationSecondsLeft,
      reservationExpired,
      searchErrorMsg,
      searchLoading,
      setAppView,
      setSearchQuery,
      selectTrain,
      toggleSeat,
      setVerifiedUser,
      setPassengers,
      setPaymentMethod,
      registerUser,
      updateUserProfile,
      logoutUser,
      openTicketByReference,
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