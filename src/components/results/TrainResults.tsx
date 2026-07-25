import { useState } from 'react'
import { formatPrice, getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import { useLanguage } from '../../context/LanguageContext'
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

const TRAIN_IMAGES: Record<string, string> = {
  'tr-001': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=320&q=75&auto=format',
  'tr-002': 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=320&q=75&auto=format',
  'tr-003': 'https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=320&q=75&auto=format',
  'tr-004': 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=320&q=75&auto=format',
  'tr-005': 'https://images.unsplash.com/photo-1581350028946-e3e06a6e04f5?w=320&q=75&auto=format',
  'tr-006': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=320&q=75&auto=format',
  'tr-007': 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=320&q=75&auto=format',
  'tr-008': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&q=75&auto=format',
}

function TrainCard({ train, departureDate }: { train: Train; departureDate: string }) {
  const { selectTrain } = useBooking()
  const { t, lang } = useLanguage()
  const [showClasses, setShowClasses] = useState(false)
  const [showStops, setShowStops] = useState(false)

  const from = getStationById(train.fromStationId)
  const to   = getStationById(train.toStationId)
  const intermediateStops = train.stops.slice(1, -1)
  const imgSrc = TRAIN_IMAGES[train.id] ?? TRAIN_IMAGES['tr-001']

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
                <button
                  type="button"
                  onClick={() => setShowStops(!showStops)}
                  className="inline-flex items-center gap-0.5 text-emerald-600 hover:underline"
                >
                  <MapPinIcon size={11} />
                  {stopLabel}
                  <svg width="9" height="9" viewBox="0 0 10 10" className={`transition-transform ${showStops ? 'rotate-180' : ''}`}>
                    <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {showStops && stopCount > 0 && (
            <div className="stops-expand flex flex-wrap gap-x-3 gap-y-0.5 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
              {intermediateStops.map((s) => {
                const st = getStationById(s.stationId)
                return (
                  <span key={s.stationId} className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
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

        {/* Right: image + price + button */}
        <div className="flex w-52 shrink-0 flex-col items-stretch overflow-hidden border-l border-slate-100">
          <div className="relative h-[72px] overflow-hidden bg-slate-100">
            <img src={imgSrc} alt={train.name} className="h-full w-full object-cover" loading="lazy" />
          </div>
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
                <div className="w-24 shrink-0 overflow-hidden bg-slate-100">
                  <img src={imgSrc} alt={cls.label} className="h-full w-full object-cover" loading="lazy" />
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
