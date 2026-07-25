import { useState } from 'react'
import { formatPrice, getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import type { ClassType, Train, TrainStop } from '../../types'
import { parseLocalDate } from '../../utils/date'
import { ClockIcon, MapPinIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { PageHeader } from '../ui/PageHeader'

function StopTimeline({ stops }: { stops: TrainStop[] }) {
  return (
    <div className="stop-timeline">
      {stops.map((stop, index) => {
        const station = getStationById(stop.stationId)
        const isFirst = index === 0
        const isLast = index === stops.length - 1

        return (
          <div key={stop.stationId} className="stop-timeline-row">
            {/* Timeline visual */}
            <div className="stop-timeline-track">
              <div
                className={`stop-timeline-dot ${
                  isFirst || isLast
                    ? 'stop-timeline-dot--endpoint'
                    : 'stop-timeline-dot--mid'
                }`}
              />
              {!isLast && <div className="stop-timeline-line" />}
            </div>

            {/* Stop details */}
            <div className="stop-timeline-content">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold tabular-nums text-slate-900">
                  {isFirst ? stop.departureTime : stop.arrivalTime}
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {station?.name}
                </span>
                <span className="text-xs text-slate-400">
                  {station?.nameMm}
                </span>
              </div>

              {/* Show departure time if different from arrival (intermediate stops) */}
              {!isFirst && !isLast && stop.departureTime && (
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                  <span>
                    Departs {stop.departureTime}
                  </span>
                  {stop.stopDuration && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">
                        {stop.stopDuration} stop
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TrainCard({ train }: { train: Train }) {
  const { selectTrain } = useBooking()
  const [showStops, setShowStops] = useState(false)
  const from = getStationById(train.fromStationId)
  const to = getStationById(train.toStationId)
  const intermediateStopCount = Math.max(0, train.stops.length - 2)

  return (
    <Card padding="none" className="train-card overflow-hidden">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-medium text-slate-900">{train.name}</p>
            <p className="text-xs text-slate-500">No. {train.number}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <ClockIcon size={14} />
            {train.duration}
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Departure / Arrival summary */}
        <div className="mb-1 flex items-center justify-between text-center">
          <div className="text-left">
            <p className="text-lg font-semibold tabular-nums text-slate-900">
              {train.departureTime}
            </p>
            <p className="text-xs text-slate-500">{from?.name}</p>
          </div>

          <div className="mx-4 flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-400 via-slate-200 to-emerald-400" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            {intermediateStopCount > 0 && (
              <button
                type="button"
                onClick={() => setShowStops(!showStops)}
                className="group flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <MapPinIcon size={11} className="text-slate-400 group-hover:text-emerald-500" />
                {intermediateStopCount} stop{intermediateStopCount > 1 ? 's' : ''}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className={`transition-transform duration-200 ${showStops ? 'rotate-180' : ''}`}
                >
                  <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
            )}
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold tabular-nums text-slate-900">
              {train.arrivalTime}
            </p>
            <p className="text-xs text-slate-500">{to?.name}</p>
          </div>
        </div>

        {/* Expandable stops timeline */}
        {showStops && (
          <div className="stops-expand mt-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Route stops
            </p>
            <StopTimeline stops={train.stops} />
          </div>
        )}

        {/* Class selection */}
        <div className="mt-4 space-y-2">
          {train.classes.map((cls) => (
            <button
              key={cls.type}
              type="button"
              onClick={() => selectTrain(train, cls.type as ClassType)}
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left transition hover:border-emerald-600 hover:bg-emerald-50/50 active:scale-[0.99]"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{cls.label}</p>
                <p className="text-xs text-slate-500">{cls.availableSeats} seats left</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">{formatPrice(cls.price)}</p>
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function TrainResults() {
  const { searchQuery, searchResults, goToStep } = useBooking()

  if (!searchQuery) return null

  const from = getStationById(searchQuery.fromStationId)
  const to = getStationById(searchQuery.toStationId)
  const dateLabel = parseLocalDate(searchQuery.departureDate).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const tripLabel = searchQuery.tripType === 'round-trip' && searchQuery.returnDate
    ? (() => {
        const returnLabel = parseLocalDate(searchQuery.returnDate).toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
        return `${dateLabel} → ${returnLabel}`
      })()
    : dateLabel

  return (
    <div>
      <PageHeader
        title={`${from?.name} to ${to?.name}`}
        description={`${tripLabel} · ${searchQuery.passengerCount} passenger${searchQuery.passengerCount > 1 ? 's' : ''}${searchQuery.tripType === 'round-trip' ? ' · Round trip' : ''}`}
        backLabel="Edit search"
        onBack={() => goToStep('search')}
        action={
          <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
          </span>
        }
      />

      {searchResults.length === 0 ? (
        <Card className="text-center">
          <p className="font-medium text-slate-900">No trains on this route</p>
          <p className="mt-1 text-sm text-slate-500">Try different stations.</p>
          <Button variant="secondary" className="mt-4" onClick={() => goToStep('search')}>
            New search
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {searchResults.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
      )}
    </div>
  )
}
