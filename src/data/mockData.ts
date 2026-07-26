import type { Seat, Station, Train } from '../types'

export const stations: Station[] = [
  { id: 'ygn', name: 'Yangon', nameMm: 'ရန်ကုန်' },
  { id: 'mdy', name: 'Mandalay', nameMm: 'မန္တလေး' },
  { id: 'npt', name: 'Naypyidaw', nameMm: 'နေပြည်တော်' },
  { id: 'bgn', name: 'Bagan', nameMm: 'ပုဂံ' },
  { id: 'tgo', name: 'Taungoo', nameMm: 'တောင်ငူ' },
  { id: 'bgo', name: 'Bago', nameMm: 'ပဲခူး' },
  { id: 'pyay', name: 'Pyay', nameMm: 'ပြည်' },
  { id: 'maw', name: 'Mawlamyine', nameMm: 'မော်လမြိုင်' },
  { id: 'thz', name: 'Thazi', nameMm: 'သာစည်' },
  { id: 'mkt', name: 'Meiktila', nameMm: 'မိတ္ထီလာ' },
  { id: 'kyse', name: 'Kyaikto', nameMm: 'ကျိုက်ထို' },
  // Additional stations for mapping
  { id: 'sag', name: 'Sagaing', nameMm: 'စစ်ကိုင်း' },
  { id: 'shw', name: 'Shwenyaung', nameMm: 'ရွှေညောင်' },
  { id: 'lsk', name: 'Lashio', nameMm: 'လားရှိုး' },
  { id: 'myk', name: 'Myitkyina', nameMm: 'မြစ်ကြီးနား' },
  { id: 'hpa', name: 'Hpa-An', nameMm: 'ဘားအံ' },
  { id: 'tny', name: 'Taunggyi', nameMm: 'တောင်ကြီး' },
]

export const trains: Train[] = [
  {
    id: 'tr-001',
    name: 'Upcountry Express',
    number: '12',
    fromStationId: 'ygn',
    toStationId: 'mdy',
    departureTime: '06:00',
    arrivalTime: '18:30',
    duration: '12h 30m',
    classes: [
      { type: 'first-1',  label: 'First Class 1',  price: 85000,  availableSeats: 12 },
      { type: 'first-2',  label: 'First Class 2',  price: 65000,  availableSeats: 18 },
      { type: 'upper-1',  label: 'Upper Class 1',  price: 45000,  availableSeats: 24 },
      { type: 'upper-2',  label: 'Upper Class 2',  price: 35000,  availableSeats: 30 },
      { type: 'ordinary', label: 'Ordinary Class', price: 18000,  availableSeats: 56 },
    ],
    stops: [
      { stationId: 'ygn', arrivalTime: null, departureTime: '06:00' },
      { stationId: 'bgo', arrivalTime: '07:25', departureTime: '07:30', stopDuration: '5 min' },
      { stationId: 'tgo', arrivalTime: '10:45', departureTime: '10:55', stopDuration: '10 min' },
      { stationId: 'npt', arrivalTime: '13:00', departureTime: '13:15', stopDuration: '15 min' },
      { stationId: 'thz', arrivalTime: '15:20', departureTime: '15:30', stopDuration: '10 min' },
      { stationId: 'mkt', arrivalTime: '16:10', departureTime: '16:20', stopDuration: '10 min' },
      { stationId: 'mdy', arrivalTime: '18:30', departureTime: null },
    ],
  },
  {
    id: 'tr-002',
    name: 'Golden Route',
    number: '8',
    fromStationId: 'ygn',
    toStationId: 'mdy',
    departureTime: '14:00',
    arrivalTime: '02:15',
    duration: '12h 15m',
    classes: [
      { type: 'first-1',  label: 'First Class 1',  price: 80000,  availableSeats: 8 },
      { type: 'first-2',  label: 'First Class 2',  price: 62000,  availableSeats: 14 },
      { type: 'upper-1',  label: 'Upper Class 1',  price: 42000,  availableSeats: 18 },
      { type: 'upper-2',  label: 'Upper Class 2',  price: 32000,  availableSeats: 26 },
      { type: 'sleeper',  label: 'Sleeper',         price: 55000,  availableSeats: 16 },
      { type: 'ordinary', label: 'Ordinary Class', price: 16000,  availableSeats: 48 },
    ],
    stops: [
      { stationId: 'ygn', arrivalTime: null, departureTime: '14:00' },
      { stationId: 'bgo', arrivalTime: '15:20', departureTime: '15:25', stopDuration: '5 min' },
      { stationId: 'tgo', arrivalTime: '18:40', departureTime: '18:50', stopDuration: '10 min' },
      { stationId: 'npt', arrivalTime: '21:00', departureTime: '21:10', stopDuration: '10 min' },
      { stationId: 'thz', arrivalTime: '23:15', departureTime: '23:25', stopDuration: '10 min' },
      { stationId: 'mdy', arrivalTime: '02:15', departureTime: null },
    ],
  },
  {
    id: 'tr-003',
    name: 'Capital Link',
    number: '21',
    fromStationId: 'ygn',
    toStationId: 'npt',
    departureTime: '07:30',
    arrivalTime: '13:45',
    duration: '6h 15m',
    classes: [
      { type: 'first-2',  label: 'First Class 2',  price: 48000,  availableSeats: 20 },
      { type: 'upper-1',  label: 'Upper Class 1',  price: 28000,  availableSeats: 32 },
      { type: 'upper-2',  label: 'Upper Class 2',  price: 22000,  availableSeats: 36 },
      { type: 'ordinary', label: 'Ordinary Class', price: 12000,  availableSeats: 64 },
    ],
    stops: [
      { stationId: 'ygn', arrivalTime: null, departureTime: '07:30' },
      { stationId: 'bgo', arrivalTime: '08:50', departureTime: '08:55', stopDuration: '5 min' },
      { stationId: 'tgo', arrivalTime: '11:30', departureTime: '11:40', stopDuration: '10 min' },
      { stationId: 'npt', arrivalTime: '13:45', departureTime: null },
    ],
  },
  {
    id: 'tr-004',
    name: 'Heritage Express',
    number: '5',
    fromStationId: 'mdy',
    toStationId: 'bgn',
    departureTime: '09:00',
    arrivalTime: '15:30',
    duration: '6h 30m',
    classes: [
      { type: 'upper-1',  label: 'Upper Class 1',  price: 32000,  availableSeats: 20 },
      { type: 'upper-2',  label: 'Upper Class 2',  price: 24000,  availableSeats: 28 },
      { type: 'ordinary', label: 'Ordinary Class', price: 14000,  availableSeats: 40 },
    ],
    stops: [
      { stationId: 'mdy', arrivalTime: null, departureTime: '09:00' },
      { stationId: 'mkt', arrivalTime: '10:50', departureTime: '11:00', stopDuration: '10 min' },
      { stationId: 'thz', arrivalTime: '11:40', departureTime: '11:50', stopDuration: '10 min' },
      { stationId: 'bgn', arrivalTime: '15:30', departureTime: null },
    ],
  },
  {
    id: 'tr-005',
    name: 'Southern Star',
    number: '33',
    fromStationId: 'ygn',
    toStationId: 'maw',
    departureTime: '20:00',
    arrivalTime: '06:30',
    duration: '10h 30m',
    classes: [
      { type: 'first-2',  label: 'First Class 2',  price: 58000,  availableSeats: 10 },
      { type: 'upper-1',  label: 'Upper Class 1',  price: 38000,  availableSeats: 22 },
      { type: 'upper-2',  label: 'Upper Class 2',  price: 28000,  availableSeats: 28 },
      { type: 'sleeper',  label: 'Sleeper',         price: 48000,  availableSeats: 20 },
      { type: 'ordinary', label: 'Ordinary Class', price: 15000,  availableSeats: 52 },
    ],
    stops: [
      { stationId: 'ygn', arrivalTime: null, departureTime: '20:00' },
      { stationId: 'bgo', arrivalTime: '21:20', departureTime: '21:25', stopDuration: '5 min' },
      { stationId: 'kyse', arrivalTime: '01:00', departureTime: '01:10', stopDuration: '10 min' },
      { stationId: 'maw', arrivalTime: '06:30', departureTime: null },
    ],
  },
  {
    id: 'tr-006',
    name: 'Irrawaddy Line',
    number: '17',
    fromStationId: 'ygn',
    toStationId: 'pyay',
    departureTime: '05:45',
    arrivalTime: '11:20',
    duration: '5h 35m',
    classes: [
      { type: 'upper-2',  label: 'Upper Class 2',  price: 22000,  availableSeats: 28 },
      { type: 'ordinary', label: 'Ordinary Class', price:  9000,  availableSeats: 60 },
    ],
    stops: [
      { stationId: 'ygn', arrivalTime: null, departureTime: '05:45' },
      { stationId: 'pyay', arrivalTime: '11:20', departureTime: null },
    ],
  },
  {
    id: 'tr-007',
    name: 'Northern Express',
    number: '9',
    fromStationId: 'mdy',
    toStationId: 'ygn',
    departureTime: '08:00',
    arrivalTime: '20:45',
    duration: '12h 45m',
    classes: [
      { type: 'first-1',  label: 'First Class 1',  price: 85000,  availableSeats: 10 },
      { type: 'first-2',  label: 'First Class 2',  price: 65000,  availableSeats: 16 },
      { type: 'upper-1',  label: 'Upper Class 1',  price: 45000,  availableSeats: 26 },
      { type: 'upper-2',  label: 'Upper Class 2',  price: 35000,  availableSeats: 32 },
      { type: 'ordinary', label: 'Ordinary Class', price: 18000,  availableSeats: 54 },
    ],
    stops: [
      { stationId: 'mdy', arrivalTime: null, departureTime: '08:00' },
      { stationId: 'mkt', arrivalTime: '09:50', departureTime: '10:00', stopDuration: '10 min' },
      { stationId: 'thz', arrivalTime: '10:40', departureTime: '10:50', stopDuration: '10 min' },
      { stationId: 'npt', arrivalTime: '13:00', departureTime: '13:15', stopDuration: '15 min' },
      { stationId: 'tgo', arrivalTime: '15:30', departureTime: '15:40', stopDuration: '10 min' },
      { stationId: 'bgo', arrivalTime: '18:50', departureTime: '18:55', stopDuration: '5 min' },
      { stationId: 'ygn', arrivalTime: '20:45', departureTime: null },
    ],
  },
  {
    id: 'tr-008',
    name: 'Central Commuter',
    number: '44',
    fromStationId: 'npt',
    toStationId: 'mdy',
    departureTime: '16:30',
    arrivalTime: '21:00',
    duration: '4h 30m',
    classes: [
      { type: 'upper-1',  label: 'Upper Class 1',  price: 18000,  availableSeats: 30 },
      { type: 'upper-2',  label: 'Upper Class 2',  price: 14000,  availableSeats: 40 },
      { type: 'ordinary', label: 'Ordinary Class', price:  8000,  availableSeats: 70 },
    ],
    stops: [
      { stationId: 'npt', arrivalTime: null, departureTime: '16:30' },
      { stationId: 'thz', arrivalTime: '18:00', departureTime: '18:10', stopDuration: '10 min' },
      { stationId: 'mkt', arrivalTime: '18:50', departureTime: '19:00', stopDuration: '10 min' },
      { stationId: 'mdy', arrivalTime: '21:00', departureTime: null },
    ],
  },
]

const SEAT_COLUMNS = ['A', 'B', 'C', 'D']
const SEAT_ROWS = 12

function hashSeed(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function generateCoachSeats(trainId: string, classType: string): Seat[] {
  const seed = hashSeed(`${trainId}-${classType}`)
  const seats: Seat[] = []

  for (let row = 1; row <= SEAT_ROWS; row++) {
    for (const column of SEAT_COLUMNS) {
      const id = `${row}${column}`
      const seatIndex = (row - 1) * SEAT_COLUMNS.length + SEAT_COLUMNS.indexOf(column)
      const isBooked = ((seed + seatIndex * 7) % 11) < 3
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

export function getStationById(id: string): Station | undefined {
  // Map numeric IDs to string IDs if needed
  const mappedId = stationIdMap[id] || id.toLowerCase()
  return stations.find((s) => s.id === mappedId)
}

// Map numeric station IDs from backend to string IDs used in mock data
const stationIdMap: Record<string, string> = {
  // Yangon stations
  '1': 'ygn',   // Yangon Central (YGN)
  '2': 'ygn',   // Insein (INS) - map to ygn for simplicity
  '12': 'ygn',  // Htaukkyant (HTY) - map to ygn
  
  // Mandalay stations  
  '6': 'mdy',   // Mandalay (MDY)
  '10': 'mdy',  // Thazi (THT) - map to mdy
  '13': 'mdy',  // Pyin Oo Lwin (PHU) - map to mdy
  '15': 'mdy',  // Kyaukse (KYT) - map to mdy
  
  // Naypyitaw
  '9': 'npt',   // Naypyitaw (NPT)
  
  // Bago Region
  '3': 'bgo',   // Bago (BGN)
  '4': 'bgo',   // Pyay (PYA) - map to bgo
  '5': 'bgo',   // Taungoo (TGO) - map to bgo
  
  // Sagaing
  '7': 'sag',   // Sagaing (SAG) - use 'sag' as placeholder
  '8': 'sag',   // Monywa (MNY) - map to sag
  '16': 'sag',  // Kalay (KLA) - map to sag
  
  // Other major stations
  '11': 'shw',  // Shwenyaung (SHW) - use 'shw' as placeholder
  '14': 'lsk',  // Lashio (LSK) - use 'lsk' as placeholder
  '17': 'myk',  // Myitkyina (MYK) - use 'myk' as placeholder
  '18': 'hpa',  // Hpa-An (HPA) - use 'hpa' as placeholder
  '19': 'maw',  // Mawlamyine (MAW) - use 'maw' as placeholder
  '20': 'tny',  // Taunggyi (TNY) - use 'tny' as placeholder
}

export function searchTrains(fromStationId: string, toStationId: string): Train[] {
  // Convert numeric IDs to string IDs if needed
  const fromId = stationIdMap[fromStationId] || fromStationId.toLowerCase()
  const toId = stationIdMap[toStationId] || toStationId.toLowerCase()
  
  return trains.filter(
    (t) => t.fromStationId === fromId && t.toStationId === toId,
  )
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-MM', {
    style: 'currency',
    currency: 'MMK',
    maximumFractionDigits: 0,
  }).format(amount)
}
