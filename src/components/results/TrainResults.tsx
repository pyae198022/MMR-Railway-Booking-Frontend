import { formatPrice, getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import type { ClassType, Train } from '../../types'
import { parseLocalDate } from '../../utils/date'
import { ClockIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { PageHeader } from '../ui/PageHeader'

function TrainCard({ train }: { train: Train }) {
  const { selectTrain } = useBooking()
  const from = getStationById(train.fromStationId)
  const to = getStationById(train.toStationId)

  return (
    <Card padding="none" className="overflow-hidden">
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
        <div className="mb-4 flex items-center justify-between text-center">
          <div>
            <p className="text-lg font-semibold tabular-nums text-slate-900">
              {train.departureTime}
            </p>
            <p className="text-xs text-slate-500">{from?.name}</p>
          </div>
          <div className="mx-4 h-px flex-1 bg-slate-200" />
          <div>
            <p className="text-lg font-semibold tabular-nums text-slate-900">
              {train.arrivalTime}
            </p>
            <p className="text-xs text-slate-500">{to?.name}</p>
          </div>
        </div>

        <div className="space-y-2">
          {train.classes.map((cls) => (
            <button
              key={cls.type}
              type="button"
              onClick={() => selectTrain(train, cls.type as ClassType)}
              className="flex w-full items-center justify-between rounded-md border border-slate-200 px-4 py-3 text-left transition hover:border-emerald-600 hover:bg-emerald-50/50"
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

  return (
    <div>
      <PageHeader
        title={`${from?.name} to ${to?.name}`}
        description={`${dateLabel} · ${searchQuery.passengerCount} passenger${searchQuery.passengerCount > 1 ? 's' : ''}`}
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
