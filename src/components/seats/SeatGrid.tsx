import { formatPrice, getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import type { Seat } from '../../types'
import { ArrowRightIcon, ArmchairIcon } from '../icons'
import { PageHeader } from '../ui/PageHeader'

function SeatLegendBar() {
  const items = [
    {
      label: 'Available',
      swatch: 'seat-swatch-available',
      desc: 'Tap to select',
    },
    {
      label: 'Selected',
      swatch: 'seat-swatch-selected',
      desc: 'Your pick',
    },
    {
      label: 'Occupied',
      swatch: 'seat-swatch-booked',
      desc: 'Unavailable',
    },
  ]

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-1 min-w-[140px] items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5"
        >
          <span className={`seat-swatch ${item.swatch}`} aria-hidden />
          <div>
            <p className="text-xs font-semibold text-slate-800">{item.label}</p>
            <p className="text-[10px] text-slate-500">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SeatButton({
  seat,
  onToggle,
}: {
  seat: Seat
  onToggle: (id: string) => void
}) {
  const isSelected = seat.status === 'selected'
  const isBooked = seat.status === 'booked'

  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={() => onToggle(seat.id)}
      aria-label={`Seat ${seat.id}${isBooked ? ', occupied' : isSelected ? ', selected' : ', available'}`}
      aria-pressed={isSelected}
      className={`seat-btn ${isBooked ? 'seat-btn-booked' : isSelected ? 'seat-btn-selected' : 'seat-btn-available'}`}
    >
      <span className={isBooked ? 'line-through decoration-slate-400' : ''}>
        {seat.id}
      </span>
    </button>
  )
}

export function SeatGrid() {
  const {
    selectedTrain,
    selectedClass,
    searchQuery,
    seats,
    selectedSeats,
    toggleSeat,
    canProceedFromSeats,
    goToStep,
    totalPrice,
  } = useBooking()

  if (!selectedTrain || !selectedClass || !searchQuery) return null

  const from = getStationById(selectedTrain.fromStationId)
  const to = getStationById(selectedTrain.toStationId)
  const classLabel =
    selectedTrain.classes.find((c) => c.type === selectedClass)?.label ?? selectedClass

  const rows = [...new Set(seats.map((s) => s.row))].sort((a, b) => a - b)
  const required = searchQuery.passengerCount
  const seatsLabel =
    selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None yet'

  return (
    <div className="pb-28">
      <PageHeader
        title="Select your seats"
        description={`${selectedTrain.name} · ${from?.name} → ${to?.name} · ${classLabel}`}
        backLabel="Back to trains"
        onBack={() => goToStep('results')}
      />

      <div className="seat-page-card overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.06]">
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4 sm:px-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
            <ArmchairIcon size={16} className="text-emerald-600" />
            Seat map
          </div>
          <SeatLegendBar />
        </div>

        <div className="px-4 py-6 sm:px-6 sm:py-8">
          <div className="coach-shell mx-auto max-w-md">
            <div className="coach-end coach-end-front">
              <span className="coach-end-label">↑ Front of train</span>
            </div>

            <div className="coach-body">
              <div className="coach-side-label coach-side-left hidden sm:block">Window</div>

              <div className="coach-aisle-wrap flex-1 overflow-x-auto">
                <div className="coach-grid mx-auto">
                  {rows.map((row) => {
                    const rowSeats = seats.filter((s) => s.row === row)
                    const left = rowSeats.filter((s) => s.column === 'A' || s.column === 'B')
                    const right = rowSeats.filter((s) => s.column === 'C' || s.column === 'D')

                    return (
                      <div key={row} className="coach-row">
                        <span className="coach-row-num">{row}</span>
                        <div className="coach-seat-group">{left.map((s) => (
                          <SeatButton key={s.id} seat={s} onToggle={toggleSeat} />
                        ))}</div>
                        <div className="coach-aisle" aria-hidden />
                        <div className="coach-seat-group">{right.map((s) => (
                          <SeatButton key={s.id} seat={s} onToggle={toggleSeat} />
                        ))}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="coach-side-label coach-side-right hidden sm:block">Aisle</div>
            </div>

            <div className="coach-end coach-end-back">
              <span className="coach-end-label">Entrance / Exit ↓</span>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-500">
            Seats A & B are by the window · C & D are aisle-side
          </p>
        </div>
      </div>

      <div className="seat-action-bar">
        <div className="seat-action-inner">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Selected seats
            </p>
            <p className="truncate text-sm font-semibold text-slate-900">
              {seatsLabel}
              <span className="ml-2 font-normal text-slate-500">
                ({selectedSeats.length}/{required})
              </span>
            </p>
            <p className="text-sm font-semibold text-emerald-700">{formatPrice(totalPrice)}</p>
          </div>

          <button
            type="button"
            disabled={!canProceedFromSeats}
            onClick={() => goToStep('passengers')}
            className={
              canProceedFromSeats
                ? 'search-cta group flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white'
                : 'flex shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-400'
            }
          >
            Proceed to details
            <ArrowRightIcon
              size={18}
              className={canProceedFromSeats ? 'transition-transform duration-200 group-hover:translate-x-1' : ''}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
