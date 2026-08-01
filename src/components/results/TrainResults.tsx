import { useState } from 'react'
import { useBooking } from "../../context/BookingContext"
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, getStationById, getStationByCode, TRAIN_ROUTE_STOPS } from '../../utils'
import type { ClassType, Train } from '../../types'
import { parseLocalDate } from '../../utils/date'
import { ClockIcon, MapPinIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { PageHeader } from '../ui/PageHeader'

// Format ISO datetime string (e.g. "2026-08-02T07:00:10.20437") to "07:00"
function formatTrainTime(isoStr: string): string {
  if (!isoStr) return ''
  // If it's already HH:MM format, return as-is
  if (/^\d{2}:\d{2}/.test(isoStr)) return isoStr.slice(0, 5)
  try {
    const d = new Date(isoStr)
    if (isNaN(d.getTime())) return isoStr
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
  } catch {
    return isoStr
  }
}

// Get display name from backend train's sourceStation / destinationStation object
function stationDisplayName(train: Train, which: 'from' | 'to', lang: string): string {
  const backendStation = which === 'from'
    ? (train as any).sourceStation
    : (train as any).destinationStation
  if (backendStation?.name) return backendStation.name
  const st = getStationById(which === 'from' ? train.fromStationId : train.toStationId)
  return lang === 'mm' ? (st?.nameMm ?? st?.name ?? '') : (st?.name ?? '')
}

const CLASS_STYLE: Record<ClassType, { badge: string; tag: { mm: string; en: string }; desc: { mm: string; en: string } }> = {
  'first-1':  { badge: 'bg-indigo-100 text-indigo-700',   tag: { mm: '★ AC ပရီမီယံ',    en: '★ Premium AC'    }, desc: { mm: 'AC · ကလပ်ထိုင်ခုံ',        en: 'AC · Reclining seats'       } },
  'first-2':  { badge: 'bg-blue-100 text-blue-700',       tag: { mm: 'AC',               en: 'AC'              }, desc: { mm: 'AC · သတ်မှတ်ထိုင်ခုံ',      en: 'AC · Assigned seats'        } },
  'upper-1':  { badge: 'bg-teal-100 text-teal-700',       tag: { mm: 'ပန်ကာ · ကုလားထိုင်', en: 'Fan · Cushioned' }, desc: { mm: 'ပန်ကာ · ကုလားထိုင်',        en: 'Fan-cooled · Cushioned'     } },
  'upper-2':  { badge: 'bg-emerald-100 text-emerald-700', tag: { mm: 'ပန်ကာ',             en: 'Fan'             }, desc: { mm: 'ပန်ကာ · သတ်မှတ်ထိုင်ခုံ',   en: 'Fan-cooled · Assigned'      } },
  'sleeper':  { badge: 'bg-violet-100 text-violet-700',   tag: { mm: '🌙 ညအိပ်ခန်း',     en: '🌙 Sleeper'      }, desc: { mm: 'ညဘက် အိပ်ခန်းပါ',          en: 'Overnight sleeper berth'    } },
  'ordinary': { badge: 'bg-slate-100 text-slate-600',     tag: { mm: 'သာမန်ထိုင်ခုံ',     en: 'Bench'           }, desc: { mm: 'ပုံသေထိုင်ခုံ · မသတ်မှတ်', en: 'Bench seats · No assignment'} },
}

// ─── Route Map Modal ─────────────────────────────────────────────────────────
function RouteMapModal({
  train,
  fromStationId,
  toStationId,
  lang,
  onClose,
}: {
  train: Train
  fromStationId: string
  toStationId: string
  lang: 'en' | 'mm'
  onClose: () => void
}) {
  // Build stop list from TRAIN_ROUTE_STOPS first, fall back to train.stops
  const stopCodes = TRAIN_ROUTE_STOPS[train.number] ?? []
  const stopsFromMap = stopCodes.map((code, i) => {
    const st = getStationByCode(code)
    return {
      code,
      name: lang === 'mm' ? (st?.nameMm ?? st?.name ?? code) : (st?.name ?? code),
      city: st?.city ?? '',
      isOrigin: i === 0,
      isDestination: i === stopCodes.length - 1,
      isUserOrigin: st?.code === getStationById(fromStationId)?.code,
      isUserDest:   st?.code === getStationById(toStationId)?.code,
    }
  })

  // Fall back to train.stops if no static map exists
  const displayStops = stopsFromMap.length > 0
    ? stopsFromMap
    : train.stops.map((s, i) => {
        const st = getStationById(s.stationId)
        return {
          code: st?.code ?? String(s.stationId),
          name: lang === 'mm' ? (st?.nameMm ?? st?.name ?? `Station ${s.stationId}`) : (st?.name ?? `Station ${s.stationId}`),
          city: st?.city ?? '',
          isOrigin: i === 0,
          isDestination: i === train.stops.length - 1,
          isUserOrigin: String(s.stationId) === String(fromStationId),
          isUserDest:   String(s.stationId) === String(toStationId),
        }
      })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
              {lang === 'mm' ? 'လမ်းကြောင်းမြေပုံ' : 'Route Map'}
            </p>
            <p className="text-sm font-bold text-slate-900">{train.name}</p>
            <p className="text-xs text-slate-400">No. {train.number} · {train.duration}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stops timeline */}
        <div className="px-5 py-4 max-h-[420px] overflow-y-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-slate-200" />

            <div className="space-y-0">
              {displayStops.map((stop, i) => {
                const isLast = i === displayStops.length - 1
                const isHighlighted = stop.isUserOrigin || stop.isUserDest
                const dotColor = stop.isUserOrigin
                  ? 'bg-emerald-500 ring-4 ring-emerald-100'
                  : stop.isUserDest
                  ? 'bg-rose-500 ring-4 ring-rose-100'
                  : stop.isOrigin || stop.isDestination
                  ? 'bg-slate-600'
                  : 'bg-slate-300'

                return (
                  <div key={i} className={`flex items-start gap-4 ${!isLast ? 'pb-4' : ''}`}>
                    {/* Dot */}
                    <div className={`relative z-10 mt-1 w-[10px] h-[10px] ml-[15px] rounded-full flex-shrink-0 ${dotColor} ${isHighlighted ? 'w-3 h-3 ml-[14px]' : ''}`} />

                    {/* Content */}
                    <div className={`flex-1 min-w-0 rounded-xl px-3 py-2.5 -mt-0.5 ${
                      stop.isUserOrigin
                        ? 'bg-emerald-50 border border-emerald-200'
                        : stop.isUserDest
                        ? 'bg-rose-50 border border-rose-200'
                        : 'bg-transparent'
                    }`}>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className={`text-sm font-semibold leading-tight ${
                            stop.isUserOrigin ? 'text-emerald-800'
                            : stop.isUserDest ? 'text-rose-800'
                            : stop.isOrigin || stop.isDestination ? 'text-slate-800'
                            : 'text-slate-600'
                          }`}>
                            {stop.name}
                          </p>
                          {stop.city && (
                            <p className="text-xs text-slate-400 mt-0.5">{stop.city}</p>
                          )}
                        </div>
                        <span className={`flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          stop.isUserOrigin ? 'bg-emerald-100 text-emerald-700'
                          : stop.isUserDest ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-500'
                        }`}>
                          {stop.code}
                        </span>
                      </div>
                      {(stop.isUserOrigin || stop.isUserDest) && (
                        <p className={`text-[10px] font-semibold mt-1 ${stop.isUserOrigin ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {stop.isUserOrigin
                            ? (lang === 'mm' ? '● သင့်ထွက်ခွာသောနေရာ' : '● Your departure')
                            : (lang === 'mm' ? '● သင့်ဆိုက်ရောက်မည့်နေရာ' : '● Your destination')}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-5 py-3 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
            {lang === 'mm' ? 'ထွက်ခွာ' : 'Departs'}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0" />
            {lang === 'mm' ? 'ရောက်ရှိ' : 'Arrives'}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 flex-shrink-0" />
            {lang === 'mm' ? 'နှောင့်နှေး' : 'Intermediate'}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Train Card ───────────────────────────────────────────────────────────────
function TrainCard({
  train,
  departureDate,
  fromStationId,
  toStationId,
}: {
  train: Train
  departureDate: string
  fromStationId: string
  toStationId: string
}) {
  const { selectTrain } = useBooking()
  const { t, lang } = useLanguage()
  const [showClasses, setShowClasses] = useState(false)
  const [showRouteMap, setShowRouteMap] = useState(false)

  const from = getStationById(train.fromStationId)
  const to   = getStationById(train.toStationId)
  const fromName = stationDisplayName(train, 'from', lang)
  const toName   = stationDisplayName(train, 'to', lang)
  const depTime  = formatTrainTime(train.departureTime)
  const arrTime  = formatTrainTime(train.arrivalTime)

  const intermediateStops = train.stops.slice(1, -1)
  const [y, m, d] = departureDate.split('-')
  const formattedDate = `${d}-${m}-${y}`

  const cheapestPrice = Math.min(...train.classes.map((c) => c.price))
  const stopCount = intermediateStops.length
  const stopLabel = lang === 'mm'
    ? `${stopCount} ${t('results_stops')}`
    : `${stopCount} ${stopCount > 1 ? t('results_stops_plural') : t('results_stops')}`

  // Total route stops count
  const routeCodes = TRAIN_ROUTE_STOPS[train.number] ?? []
  const totalRouteStops = routeCodes.length

  return (
    <>
      {showRouteMap && (
        <RouteMapModal
          train={train}
          fromStationId={fromStationId}
          toStationId={toStationId}
          lang={lang}
          onClose={() => setShowRouteMap(false)}
        />
      )}

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
              {depTime}
              <span className="ml-2 text-xs font-normal text-slate-400">
                {formattedDate}, {fromName}
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
              {/* Route map link */}
              <button
                type="button"
                onClick={() => setShowRouteMap(true)}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {lang === 'mm'
                  ? `လမ်းကြောင်း (${totalRouteStops || stopCount + 2})`
                  : `Route map (${totalRouteStops || stopCount + 2} stops)`}
              </button>
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
              {arrTime}
              <span className="ml-2 text-xs font-normal text-slate-400">
                {formattedDate}, {toName}
              </span>
            </p>
          </div>

          {/* Right: price + button */}
          <div className="flex w-44 shrink-0 flex-col items-stretch overflow-hidden border-l border-slate-100">
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-2">
              <div className="text-center">
                <p className="text-xs text-slate-400">{t('results_from_price')}</p>
                <p className="text-base font-bold tabular-nums text-slate-900">{formatPrice(cheapestPrice)}</p>
              </div>

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
    </>
  )
}

// ─── Train Results Page ───────────────────────────────────────────────────────
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
            <TrainCard
              key={train.id}
              train={train}
              departureDate={searchQuery.departureDate}
              fromStationId={String(searchQuery.fromStationId)}
              toStationId={String(searchQuery.toStationId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
