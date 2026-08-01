import { useState } from 'react'
import { useBooking } from "../../context/BookingContext"
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, getStationById } from '../../utils'
import type { ClassType, Train } from '../../types'
import { parseLocalDate } from '../../utils/date'
import { ClockIcon, MapPinIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { PageHeader } from '../ui/PageHeader'

const CLASS_STYLE: Record<ClassType, { badge: string; tag: { mm: string; en: string }; desc: { mm: string; en: string } }> = {
  'first-1':  { badge: 'bg-indigo-100 text-indigo-700',   tag: { mm: '★ AC ပရီမီယံ',    en: '★ Premium AC'    }, desc: { mm: 'AC · ကလပ်ထိုင်ခုံ',        en: 'AC · Reclining seats'       } },
  'first-2':  { badge: 'bg-blue-100 text-blue-700',       tag: { mm: 'AC',               en: 'AC'              }, desc: { mm: 'AC · သတ်မှတ်ထိုင်ခုံ',      en: 'AC · Assigned seats'        } },
  'upper-1':  { badge: 'bg-teal-100 text-teal-700',       tag: { mm: 'ပန်ကာ · ကုလားထိုင်', en: 'Fan · Cushioned' }, desc: { mm: 'ပန်ကာ · ကုလားထိုင်',        en: 'Fan-cooled · Cushioned'     } },
  'upper-2':  { badge: 'bg-emerald-100 text-emerald-700', tag: { mm: 'ပန်ကာ',             en: 'Fan'             }, desc: { mm: 'ပန်ကာ · သတ်မှတ်ထိုင်ခုံ',   en: 'Fan-cooled · Assigned'      } },
  'sleeper':  { badge: 'bg-violet-100 text-violet-700',   tag: { mm: '🌙 ညအိပ်ခန်း',     en: '🌙 Sleeper'      }, desc: { mm: 'ညဘက် အိပ်ခန်းပါ',          en: 'Overnight sleeper berth'    } },
  'ordinary': { badge: 'bg-slate-100 text-slate-600',     tag: { mm: 'သာမန်ထိုင်ခုံ',     en: 'Bench'           }, desc: { mm: 'ပုံသေထိုင်ခုံ · မသတ်မှတ်', en: 'Bench seats · No assignment'} },
}



function TrainCard({ train, departureDate }: { train: Train; departureDate: string }) {
  const { selectTrain } = useBooking()
  const { t, lang } = useLanguage()
  const [showClasses, setShowClasses] = useState(false)

  const from = getStationById(train.fromStationId)
  const to   = getStationById(train.toStationId)
  const intermediateStops = train.stops.slice(1, -1)

  const [y, m, d] = departureDate.split('-')
  const formattedDate = `${d}-${m}-${y}`

  const cheapestPrice = Math.min(...train.classes.map((c) => c.price))
  const stopCount = intermediateStops.length
  const stopLabel = lang === 'mm'
    ? `${stopCount} ${t('results_stops')}`
    : `${stopCount} ${stopCount > 1 ? t('results_stops_plural') : t('results_stops')}`

  return (
    <div className="result-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex min-h-[130px] items-stretch">
        {/* Timeline */}
        <div className="flex w-14 shrink-0 flex-col items-center py-4">
          <span className="result-dot result-dot--from" />
          <span className="result-line flex-1" />
          <span className="result-dot result-dot--to" />
        </div>

        {/* Centre info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 py-4 pr-3">
          <p className="text-sm font-bold tabular-nums text-slate-900">
            {train.departureTime}
            <span className="ml-2 text-xs font-normal text-slate-400">
              {formattedDate}, {lang === 'mm' ? (from?.nameMm ?? from?.name) : from?.name}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium text-slate-700">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                <rect x="2" y="7" width="20" height="11" rx="2" /><path d="M16 7V4H8v3" /><path d="M5 18l-1 3M19 18l1 3" /><line x1="8" y1="13" x2="16" y2="13" />
              </svg>
              {train.name}
            </span>
            <span className="text-slate-300">·</span>
            <span>No. {train.number}</span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-0.5"><ClockIcon size={11} />{train.duration}</span>
            {stopCount > 0 && (
              <>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-0.5 text-emerald-600">
                  <MapPinIcon size={11} />
                  {stopLabel}
                </span>
              </>
            )}
          </div>

          {stopCount > 0 && (
            <div className="stops-expand mt-2 flex flex-wrap gap-x-3 gap-y-0.5 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
              <div className="flex w-full items-center gap-1.5 mb-1">
                <MapPinIcon size={10} />
                <span className="font-medium">Intermediate Stations:</span>
              </div>
              {intermediateStops.map((s) => {
                const st = getStationById(s.stationId)
                return (
                  <span key={s.stationId} className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {lang === 'mm' ? (st?.nameMm ?? st?.name) : st?.name}
                    {s.arrivalTime && (
                      <span className="tabular-nums text-slate-400">
                        ({s.arrivalTime}{s.stopDuration ? ` · ${s.stopDuration}` : ''})
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          )}

          <p className="text-sm font-bold tabular-nums text-slate-900">
            {train.arrivalTime}
            <span className="ml-2 text-xs font-normal text-slate-400">
              {formattedDate}, {lang === 'mm' ? (to?.nameMm ?? to?.name) : to?.name}
            </span>
          </p>
        </div>

        {/* Right: price + stops info + button */}
        <div className="flex w-52 shrink-0 flex-col items-stretch overflow-hidden border-l border-slate-100">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-2">
            <div className="text-center">
              <p className="text-xs text-slate-400">{t('results_from_price')}</p>
              <p className="text-base font-bold tabular-nums text-slate-900">{formatPrice(cheapestPrice)}</p>
            </div>
            
            {/* Stop stations information */}
            {stopCount > 0 ? (
              <div className="w-full">
                <div className="mb-1 flex items-center justify-center gap-1 text-xs text-slate-600">
                  <MapPinIcon size={11} />
                  <span className="font-medium">{stopLabel}</span>
                </div>
                <div className="max-h-24 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-1.5">
                  <div className="space-y-1">
                    {intermediateStops.slice(0, 3).map((s) => {
                      const st = getStationById(s.stationId)
                      return (
                        <div key={s.stationId} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          <span className="truncate">{lang === 'mm' ? (st?.nameMm ?? st?.name) : st?.name}</span>
                          {s.arrivalTime && (
                            <span className="ml-auto shrink-0 tabular-nums text-slate-400 text-[9px]">
                              {s.arrivalTime}
                            </span>
                          )}
                        </div>
                      )
                    })}
                    {intermediateStops.length > 3 && (
                      <div className="text-center text-[9px] text-slate-500">
                        +{intermediateStops.length - 3} more stops
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-500">
                <MapPinIcon size={12} className="mx-auto mb-1" />
                <span>Direct route</span>
              </div>
            )}
            
            <button
              type="button"
              onClick={() => setShowClasses(!showClasses)}
              className="result-select-btn w-full rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition"
            >
              {showClasses ? t('results_hide_classes') : t('results_select_class')}
            </button>
          </div>
        </div>
      </div>

      {/* Class rows */}
      {showClasses && (
        <div className="class-rows-expand border-t border-slate-100">
          {train.classes.map((cls) => {
            const style = CLASS_STYLE[cls.type as ClassType]
            const seatsLeft = `${cls.availableSeats} ${t('results_seats_left')}`
            return (
              <div key={cls.type} className="flex items-stretch border-b border-slate-100 last:border-0">
                <div className="flex flex-1 flex-col justify-center gap-1 py-3 pl-14 pr-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{cls.label}</p>
                    {style && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.badge}`}>
                        {style.tag[lang]}
                      </span>
                    )}
                  </div>
                  {style && <p className="text-xs text-slate-400">{style.desc[lang]}</p>}
                  <p className="text-[11px] text-slate-500">{seatsLeft}</p>
                  <button
                    type="button"
                    onClick={() => selectTrain(train, cls.type as ClassType)}
                    className="mt-0.5 w-fit text-xs font-medium text-emerald-600 hover:underline"
                  >
                    {t('results_choose_seats')}
                  </button>
                </div>
                {/* Stop stations info for this class */}
                <div className="w-32 shrink-0 overflow-hidden border-l border-slate-100 px-2 py-3">
                  <div className="h-full overflow-y-auto">
                    <div className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-600">
                      <MapPinIcon size={9} />
                      <span>Route Stops</span>
                    </div>
                    <div className="space-y-0.5">
                      {/* Starting station */}
                      <div className="flex items-center gap-1 text-[9px] text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="truncate">{lang === 'mm' ? (from?.nameMm ?? from?.name) : from?.name}</span>
                        <span className="ml-auto tabular-nums text-slate-400">{train.departureTime}</span>
                      </div>
                      {/* Intermediate stops (show first 2) */}
                      {intermediateStops.slice(0, 2).map((s) => {
                        const st = getStationById(s.stationId)
                        return (
                          <div key={s.stationId} className="flex items-center gap-1 text-[9px] text-slate-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                            <span className="truncate">{lang === 'mm' ? (st?.nameMm ?? st?.name) : st?.name}</span>
                            {s.arrivalTime && (
                              <span className="ml-auto tabular-nums text-slate-400">{s.arrivalTime}</span>
                            )}
                          </div>
                        )
                      })}
                      {/* Destination station */}
                      <div className="flex items-center gap-1 text-[9px] text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                        <span className="truncate">{lang === 'mm' ? (to?.nameMm ?? to?.name) : to?.name}</span>
                        <span className="ml-auto tabular-nums text-slate-400">{train.arrivalTime}</span>
                      </div>
                      {intermediateStops.length > 2 && (
                        <div className="text-center text-[8px] text-slate-500 pt-0.5">
                          +{intermediateStops.length - 2} intermediate stops
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex w-28 shrink-0 flex-col items-center justify-center gap-1.5 border-l border-slate-100 px-2 py-3">
                  <div className="text-center">
                    <p className="text-sm font-bold tabular-nums text-slate-900">{formatPrice(cls.price)}</p>
                    <p className="text-[10px] text-slate-400">{t('results_per_pax')}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectTrain(train, cls.type as ClassType)}
                    className="result-book-btn w-full rounded-lg px-2 py-1.5 text-[11px] font-bold text-white transition"
                  >
                    {t('results_book_now')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function TrainResults() {
  const { searchQuery, searchResults, goToStep } = useBooking()
  const { t, lang } = useLanguage()

  if (!searchQuery) return null

  const from = getStationById(searchQuery.fromStationId)
  const to   = getStationById(searchQuery.toStationId)

  const fromName = lang === 'mm' ? (from?.nameMm ?? from?.name) : from?.name
  const toName   = lang === 'mm' ? (to?.nameMm   ?? to?.name)   : to?.name

  const dateLabel = parseLocalDate(searchQuery.departureDate).toLocaleDateString(
    lang === 'mm' ? 'my-MM' : 'en-GB',
    { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
  )

  const tripLabel =
    searchQuery.tripType === 'round-trip' && searchQuery.returnDate
      ? (() => {
          const ret = parseLocalDate(searchQuery.returnDate).toLocaleDateString(
            lang === 'mm' ? 'my-MM' : 'en-GB',
            { weekday: 'short', day: 'numeric', month: 'short' }
          )
          return `${dateLabel} → ${ret}`
        })()
      : dateLabel

  const paxCount = searchQuery.passengerCount
  const paxLabel = lang === 'mm'
    ? `${paxCount} ${t('results_passengers')}`
    : `${paxCount} ${paxCount > 1 ? 'passengers' : 'passenger'}`

  const resultCount = searchResults.length
  const resultLabel = lang === 'mm'
    ? `${resultCount} ${t('results_results')}`
    : `${resultCount} ${resultCount !== 1 ? 'results' : 'result'}`

  return (
    <div>
      <PageHeader
        title={`${fromName} → ${toName}`}
        description={`${tripLabel} · ${paxLabel}${searchQuery.tripType === 'round-trip' ? ` · ${t('results_round_trip')}` : ''}`}
        backLabel={t('results_edit_search')}
        onBack={() => goToStep('search')}
        action={
          <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
            {resultLabel}
          </span>
        }
      />

      {searchResults.length === 0 ? (
        <Card className="text-center">
          <p className="font-medium text-slate-900">{t('results_no_trains')}</p>
          <p className="mt-1 text-sm text-slate-500">{t('results_try_other')}</p>
          <Button variant="secondary" className="mt-4" onClick={() => goToStep('search')}>
            {t('results_new_search')}
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {searchResults.map((train) => (
            <TrainCard key={train.id} train={train} departureDate={searchQuery.departureDate} />
          ))}
        </div>
      )}
    </div>
  )
}
