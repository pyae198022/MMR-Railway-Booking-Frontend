import { useState } from 'react'
import { defaultSearch, useBooking } from '../../context/BookingContext'
import {
  ArrowRightIcon,
  CalendarIcon,
  SwapIcon,
  UsersIcon,
} from '../icons'
import { SearchDateInput, SearchField, SearchSelect } from './SearchField'
import { StationAutocomplete } from './StationAutocomplete'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=2400&q=80'

export function SearchForm() {
  const { setSearchQuery } = useBooking()
  const [from, setFrom] = useState(defaultSearch.fromStationId)
  const [to, setTo] = useState(defaultSearch.toStationId)
  const [date, setDate] = useState(defaultSearch.departureDate)
  const [passengers, setPassengers] = useState(defaultSearch.passengerCount)
  const [error, setError] = useState('')
  const [swapSpin, setSwapSpin] = useState(false)

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 60)

  const handleSwap = () => {
    setSwapSpin(true)
    setFrom(to)
    setTo(from)
    window.setTimeout(() => setSwapSpin(false), 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (from === to) {
      setError('Choose different departure and arrival stations.')
      return
    }
    setError('')
    setSearchQuery({
      fromStationId: from,
      toStationId: to,
      departureDate: date,
      passengerCount: passengers,
    })
  }

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/92 via-[#0f2744]/88 to-emerald-950/85"
        aria-hidden
      />
      <div className="hero-mesh absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
            Myanmar Railways
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Where would you like to go?
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            Compare routes, pick your seat, and get your e-ticket in minutes.
          </p>
        </div>

        <div className="search-card-float rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-900/25 backdrop-blur-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
              <StationAutocomplete
                label="From"
                value={from}
                onChange={setFrom}
                excludeId={to}
              />

              <div className="flex justify-center md:pb-1">
                <button
                  type="button"
                  onClick={handleSwap}
                  aria-label="Swap departure and arrival"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md shadow-slate-900/10 transition hover:border-emerald-400 hover:text-emerald-600 hover:shadow-lg active:scale-95"
                >
                  <SwapIcon
                    size={18}
                    className={`transition-transform duration-300 ease-out ${swapSpin ? 'rotate-180' : 'group-hover:rotate-90'}`}
                  />
                </button>
              </div>

              <StationAutocomplete
                label="To"
                value={to}
                onChange={setTo}
                excludeId={from}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SearchField label="Departure" icon={<CalendarIcon size={18} />}>
                <SearchDateInput
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  max={maxDate.toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </SearchField>

              <SearchField label="Passengers" icon={<UsersIcon size={18} />}>
                <SearchSelect
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'passenger' : 'passengers'}
                    </option>
                  ))}
                </SearchSelect>
              </SearchField>
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="search-cta group flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold text-white"
            >
              Search trains
              <ArrowRightIcon
                size={20}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400/90">
          Ticket booking · schedules and payments
        </p>
      </div>
    </section>
  )
}
