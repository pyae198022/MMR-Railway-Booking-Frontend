import { formatPrice, getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import { parseLocalDate } from '../../utils/date'
import { CheckCircleIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { MockQRCode } from './MockQRCode'

export function TicketConfirmation() {
  const { ticket, resetBooking } = useBooking()

  if (!ticket) return null

  const from = getStationById(ticket.searchQuery.fromStationId)
  const to = getStationById(ticket.searchQuery.toStationId)
  const classLabel =
    ticket.train.classes.find((c) => c.type === ticket.classType)?.label ?? ticket.classType

  const formattedDate = parseLocalDate(ticket.searchQuery.departureDate).toLocaleDateString(
    'en-GB',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  )

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6 text-center">
        <CheckCircleIcon size={40} className="mx-auto text-emerald-600" strokeWidth={1.5} />
        <h1 className="mt-3 text-xl font-semibold text-slate-900">Booking confirmed</h1>
        <p className="mt-1 text-sm text-slate-500">Reference {ticket.reference}</p>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="bg-[#0f2744] px-5 py-4 text-white">
          <p className="text-xs text-slate-300">E-ticket</p>
          <p className="text-lg font-semibold">
            {from?.name} → {to?.name}
          </p>
          <p className="text-sm text-slate-300">{formattedDate}</p>
        </div>

        <div className="p-5">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <MockQRCode data={ticket.reference} />
            <dl className="w-full space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Train</dt>
                <dd className="font-medium text-slate-900">
                  {ticket.train.name} #{ticket.train.number}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Departure</dt>
                <dd className="font-medium tabular-nums text-slate-900">
                  {ticket.train.departureTime}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Arrival</dt>
                <dd className="font-medium tabular-nums text-slate-900">
                  {ticket.train.arrivalTime}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Class</dt>
                <dd className="font-medium text-slate-900">{classLabel}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Seats</dt>
                <dd className="font-medium text-slate-900">{ticket.seats.join(', ')}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
                <dt className="text-slate-500">Total paid</dt>
                <dd className="font-semibold text-emerald-700">
                  {formatPrice(ticket.totalPrice)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Passengers
            </p>
            <ul className="space-y-2">
              {ticket.passengers.map((p, i) => (
                <li
                  key={i}
                  className="flex justify-between gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm"
                >
                  <span>
                    <span className="font-medium text-slate-900">{p.name}</span>
                    <span className="block text-xs text-slate-500">{p.nrc}</span>
                  </span>
                  <span className="text-slate-600">Seat {ticket.seats[i]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button variant="secondary" fullWidth onClick={() => window.print()}>
          Print ticket
        </Button>
        <Button fullWidth onClick={resetBooking}>
          Book again
        </Button>
      </div>
    </div>
  )
}
