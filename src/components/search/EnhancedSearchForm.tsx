import { useState, useMemo } from 'react'
import { defaultSearch, useBooking } from '../../context/BookingContext'
import { useLanguage } from '../../context/LanguageContext'
import { useStations } from '../../hooks/useApi'
import type { TripType, Station } from '../../types'
import { localDateISO } from '../../utils/date'
import { ArrowRightIcon, CalendarIcon, SwapIcon, UsersIcon } from '../icons'
import { SearchDateInput, SearchField, SearchSelect } from './SearchField'
import { MyanmarRailwayInfo } from '../mmr/MyanmarRailwayInfo'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=2400&q=80'

export function EnhancedSearchForm() {
  const { openTicketByReference, setSearchQuery } = useBooking()
  const { t, lang } = useLanguage()
  const { stations: allStations, loading: stationsLoading, error: stationsError } = useStations()

  const [tripType, setTripType] = useState<TripType>(defaultSearch.tripType)
  const [from, setFrom] = useState(defaultSearch.fromStationId)
  const [to, setTo] = useState(defaultSearch.toStationId)
  const [date, setDate] = useState(defaultSearch.departureDate)
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(defaultSearch.passengerCount)
  const [error, setError] = useState('')
  const [swapSpin, setSwapSpin] = useState(false)
  const [bookingReference, setBookingReference] = useState('')
  const [ticketError, setTicketError] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 60)

  // Group stations by state/region for better organization
  const groupedStations = useMemo(() => {
    const groups: Record<string, Station[]> = {}
    
    allStations.forEach(station => {
      const state = station.state || station.city
      if (!groups[state]) {
        groups[state] = []
      }
      groups[state].push(station)
    })
    
    return groups
  }, [allStations])

  // Get popular stations (first 8 stations as popular for demo)
  const popularStations = useMemo(() => {
    return allStations.slice(0, 8)
  }, [allStations])

  const handleSwap = () => {
    setSwapSpin(true)
    setFrom(to)
    setTo(from)
    window.setTimeout(() => setSwapSpin(false), 400)
  }

  const handleTripTypeChange = (type: TripType) => {
    setTripType(type)
    if (type === 'one-way') {
      setReturnDate('')
    } else if (!returnDate) {
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      setReturnDate(localDateISO(nextDay))
    }
  }

  const handleDepartureDateChange = (newDate: string) => {
    setDate(newDate)
    if (tripType === 'round-trip' && returnDate && returnDate <= newDate) {
      const nextDay = new Date(newDate)
      nextDay.setDate(nextDay.getDate() + 1)
      setReturnDate(localDateISO(nextDay))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Find selected stations
    const fromStation = allStations.find(s => s.id === parseInt(from));
    const toStation = allStations.find(s => s.id === parseInt(to));
    
    if (!fromStation || !toStation) {
      setError(
        lang === 'mm'
          ? 'ကျေးဇူးပြု၍ ဘူတာများကို ရွေးချယ်ပါ'
          : 'Please select stations'
      )
      return
    }
    
    if (from === to) {
      setError(
        lang === 'mm'
          ? 'ထွက်ခွာ နှင့် ရောက်ရှိ ဘူတာများ မတူညီပါ။'
          : 'Choose different departure and arrival stations.'
      )
      return
    }
    if (tripType === 'round-trip' && (!returnDate || returnDate <= date)) {
      setError(
        lang === 'mm'
          ? 'ပြန်လာသည့်ရက်သည် ထွက်ခွာသည့်ရက်ထက် နောက်ကျရမည်။'
          : 'Return date must be after the departure date.'
      )
      return
    }
    
    setError('')
    
    // Convert to backend format
    const searchData = {
      fromStationId: from,
      toStationId: to,
      departureDate: date,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      passengerCount: passengers,
      tripType,
      // For backend API
      sourceCity: fromStation.city,
      destinationCity: toStation.city,
      journeyDate: `${date}T00:00:00`,
      numberOfPassengers: passengers
    }
    
    setSearchQuery(searchData)
  }

  const handleTicketLookup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingReference.trim()) {
      setTicketError(
        lang === 'mm' ? 'ကိုးကားနံပါတ် ထည့်ပါ။' : 'Enter your booking reference.'
      )
      return
    }
    if (!openTicketByReference(bookingReference)) {
      setTicketError(
        lang === 'mm'
          ? 'ဤစက်ပစ္စည်းတွင် ထိုကိုးကားနံပါတ်ဖြင့် လက်မှတ် မတွေ့ပါ။'
          : 'No ticket found for that reference on this device.'
      )
      return
    }
    setTicketError('')
  }

  const minReturnDate = (() => {
    const d = new Date(date)
    d.setDate(d.getDate() + 1)
    return localDateISO(d)
  })()

  const passengerLabel = (n: number) =>
    lang === 'mm'
      ? `${n} ဦး`
      : `${n} ${n === 1 ? 'passenger' : 'passengers'}`

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
            {lang === 'mm' ? 'မြန်မာ့မီးရထား' : 'Myanmar Railways'}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {t('search_title')}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            {t('search_subtitle')}
          </p>
          
          {/* Backend status */}
          {stationsError && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1.5">
              <span className="text-xs font-medium text-amber-200">
                {lang === 'mm' ? 'ဘက်အန်းမရရှိပါ - အချက်အလက်များကို အသုံးပြုနေပါသည်' : 'Backend unavailable - Using local data'}
              </span>
            </div>
          )}
        </div>

        <div className="search-card-float rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-900/25 backdrop-blur-xl sm:p-8">
          {/* Trip type toggle */}
          <div className="mb-5 flex items-center justify-center">
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1">
              <button
                type="button"
                onClick={() => handleTripTypeChange('one-way')}
                className={`trip-toggle-btn rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-250 ${
                  tripType === 'one-way'
                    ? 'bg-white text-slate-900 shadow-md shadow-slate-900/10'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t('search_oneway')}
              </button>
              <button
                type="button"
                onClick={() => handleTripTypeChange('round-trip')}
                className={`trip-toggle-btn rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-250 ${
                  tripType === 'round-trip'
                    ? 'bg-white text-slate-900 shadow-md shadow-slate-900/10'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t('search_roundtrip')}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
              {/* From Station */}
              <SearchField label={t('search_from')} icon={<CalendarIcon size={18} />}>
                <SearchSelect 
                  value={from} 
                  onChange={(e) => setFrom(e.target.value)}
                  disabled={stationsLoading}
                >
                  <option value="">
                    {stationsLoading 
                      ? (lang === 'mm' ? 'ဘူတာများ လာရောက်နေသည်...' : 'Loading stations...')
                      : (lang === 'mm' ? 'ထွက်ခွာမည့် ဘူတာ ရွေးပါ' : 'Select departure station')
                    }
                  </option>
                  
                  {/* Popular Stations */}
                  <optgroup label={lang === 'mm' ? 'အဓိကဘူတာရုံများ' : 'Major Stations'}>
                    {popularStations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name} ({station.code}) - {station.city}
                      </option>
                    ))}
                  </optgroup>
                  
                  {/* All Stations by Region */}
                  {Object.entries(groupedStations).map(([state, stateStations]) => (
                    <optgroup key={state} label={state}>
                      {stateStations.map((station) => (
                        <option key={station.id} value={station.id}>
                          {station.name} ({station.code}) - {station.city}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </SearchSelect>
              </SearchField>

              <div className="flex justify-center md:pb-1">
                <button
                  type="button"
                  onClick={handleSwap}
                  aria-label={lang === 'mm' ? 'ထွက်ခွာ နှင့် ရောက်ရှိ ဘူတာ လဲလှယ်ရန်' : 'Swap departure and arrival'}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md shadow-slate-900/10 transition hover:border-emerald-400 hover:text-emerald-600 hover:shadow-lg active:scale-95"
                >
                  <SwapIcon
                    size={18}
                    className={`transition-transform duration-300 ease-out ${swapSpin ? 'rotate-180' : 'group-hover:rotate-90'}`}
                  />
                </button>
              </div>

              {/* To Station */}
              <SearchField label={t('search_to')} icon={<CalendarIcon size={18} />}>
                <SearchSelect 
                  value={to} 
                  onChange={(e) => setTo(e.target.value)}
                  disabled={stationsLoading}
                >
                  <option value="">
                    {stationsLoading 
                      ? (lang === 'mm' ? 'ဘူတာများ လာရောက်နေသည်...' : 'Loading stations...')
                      : (lang === 'mm' ? 'ရောက်ရှိမည့် ဘူတာ ရွေးပါ' : 'Select arrival station')
                    }
                  </option>
                  
                  {/* Popular Stations */}
                  <optgroup label={lang === 'mm' ? 'အဓိကဘူတာရုံများ' : 'Major Stations'}>
                    {popularStations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name} ({station.code}) - {station.city}
                      </option>
                    ))}
                  </optgroup>
                  
                  {/* All Stations by Region */}
                  {Object.entries(groupedStations).map(([state, stateStations]) => (
                    <optgroup key={state} label={state}>
                      {stateStations.map((station) => (
                        <option key={station.id} value={station.id}>
                          {station.name} ({station.code}) - {station.city}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </SearchSelect>
              </SearchField>
            </div>

            <div className={`grid gap-4 ${tripType === 'round-trip' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              <SearchField label={t('search_departure')} icon={<CalendarIcon size={18} />}>
                <SearchDateInput
                  type="date"
                  value={date}
                  min={localDateISO()}
                  max={localDateISO(maxDate)}
                  onChange={(e) => handleDepartureDateChange(e.target.value)}
                />
              </SearchField>

              {tripType === 'round-trip' && (
                <div className="return-date-enter">
                  <SearchField label={t('search_return')} icon={<CalendarIcon size={18} />}>
                    <SearchDateInput
                      type="date"
                      value={returnDate}
                      min={minReturnDate}
                      max={localDateISO(maxDate)}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </SearchField>
                </div>
              )}

              <SearchField label={t('search_passengers')} icon={<UsersIcon size={18} />}>
                <SearchSelect value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{passengerLabel(n)}</option>
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
              disabled={stationsLoading}
            >
              {stationsLoading 
                ? (lang === 'mm' ? 'စစ်ဆေးနေသည်...' : 'Checking...')
                : t('search_btn')
              }
              <ArrowRightIcon size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        {/* Ticket lookup */}
        <div className="mt-5 rounded-2xl border border-white/15 bg-slate-950/35 p-4 backdrop-blur-md sm:flex sm:items-center sm:gap-5 sm:px-5">
          <div className="mb-3 sm:mb-0 sm:min-w-0 sm:flex-1">
            <p className="text-sm font-semibold text-white">{t('search_have_ticket')}</p>
            <p className="mt-0.5 text-xs text-slate-300">
              {lang === 'mm'
                ? 'ကိုးကားနံပါတ်ဖြင့် သင်၏ လက်မှတ်ကို ကြည့်ရှုနိုင်သည်'
                : 'Enter your booking reference to view or print it.'}
            </p>
          </div>
          <form onSubmit={handleTicketLookup} className="sm:w-[22rem]">
            <label className="sr-only" htmlFor="booking-reference">
              {lang === 'mm' ? 'ကိုးကားနံပါတ်' : 'Booking reference'}
            </label>
            <div className="flex gap-2">
              <input
                id="booking-reference"
                type="text"
                value={bookingReference}
                onChange={(e) => { setBookingReference(e.target.value); setTicketError('') }}
                placeholder={t('search_ref_placeholder')}
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/95 px-3 py-2.5 text-sm font-medium uppercase text-slate-900 outline-none placeholder:normal-case placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20"
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50"
              >
                {t('search_find_ticket')}
              </button>
            </div>
            {ticketError && (
              <p className="mt-2 text-xs font-medium text-rose-200" role="alert">{ticketError}</p>
            )}
          </form>
        </div>

        {/* Myanmar Railways Info Toggle */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
          >
            <span>{showInfo 
              ? (lang === 'mm' ? 'မြန်မာ့မီးရထား အချက်အလက်များ ပိတ်ရန်' : 'Hide Myanmar Railways Info') 
              : (lang === 'mm' ? 'မြန်မာ့မီးရထား အချက်အလက်များ ကြည့်ရန်' : 'Show Myanmar Railways Info')}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform ${showInfo ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Myanmar Railways Information */}
        {showInfo && (
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/90 p-6 backdrop-blur-xl">
            <MyanmarRailwayInfo lang={lang} />
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-400/90">{t('search_footer')}</p>
      </div>
    </section>
  )
}