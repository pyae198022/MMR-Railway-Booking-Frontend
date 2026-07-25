import type { BookingTicket, TicketStatus } from '../types'

const STORAGE_KEY = 'mmr-booking-history'

export function getTicketStatus(departureDate: string): TicketStatus {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const departure = new Date(departureDate)
  departure.setHours(0, 0, 0, 0)
  return departure >= today ? 'active' : 'past'
}

export function loadBookingHistory(): BookingTicket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as BookingTicket[]
    return parsed.map((ticket) => ({
      ...ticket,
      status: getTicketStatus(ticket.searchQuery.departureDate),
    }))
  } catch {
    return []
  }
}

export function saveBookingHistory(tickets: BookingTicket[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}

export function addTicketToHistory(
  tickets: BookingTicket[],
  ticket: BookingTicket,
): BookingTicket[] {
  return [ticket, ...tickets]
}

export const RESERVATION_DURATION_MS = 10 * 60 * 1000
