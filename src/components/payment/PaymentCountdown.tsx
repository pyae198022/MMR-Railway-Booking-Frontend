import { useLanguage } from '../../context/LanguageContext'

interface PaymentCountdownProps {
  secondsLeft: number
  expired: boolean
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function PaymentCountdown({ secondsLeft, expired }: PaymentCountdownProps) {
  const { lang } = useLanguage()
  const urgent   = !expired && secondsLeft <= 120
  const critical = !expired && secondsLeft <= 60

  if (expired) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
        <p className="text-sm font-semibold text-red-800">
          {lang === 'mm' ? 'ထိုင်ခုံကြိုတင်မှတ်ပုံတင်မှု သက်တမ်းကုန်ပြီ' : 'Seat reservation expired'}
        </p>
        <p className="mt-0.5 text-xs text-red-600">
          {lang === 'mm'
            ? 'ယာယီမှတ်ပုံတင်မှု ပယ်ဖျက်ပြီးပါပြီ။ ထိုင်ခုံ ထပ်မံရွေးချယ်ပါ။'
            : 'Your temporary hold has been released. Please go back and select seats again.'}
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border px-4 py-3 ${
      critical ? 'border-red-300 bg-red-50' : urgent ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className={`text-sm font-semibold ${critical ? 'text-red-800' : urgent ? 'text-amber-900' : 'text-slate-800'}`}>
            {urgent
              ? (lang === 'mm' ? 'မြန်မြန်ချေပါ — ထိုင်ခုံ ယာယီသာ ကြိုတင်ထားသည်' : 'Hurry — seats are held temporarily')
              : (lang === 'mm' ? 'ထိုင်ခုံ ကြိုတင်မှတ်ပုံတင်ပြီး' : 'Seats reserved for you')}
          </p>
          <p className="mt-0.5 text-xs text-slate-600">
            {lang === 'mm' ? 'အချိန်မကုန်မီ ငွေပေးချေပါ' : 'Complete payment before the timer runs out'}
          </p>
        </div>
        <div className={`font-mono text-2xl font-bold tabular-nums ${
          critical ? 'text-red-700' : urgent ? 'text-amber-700' : 'text-emerald-700'
        }`} aria-live="polite">
          {formatTime(secondsLeft)}
        </div>
      </div>
    </div>
  )
}
