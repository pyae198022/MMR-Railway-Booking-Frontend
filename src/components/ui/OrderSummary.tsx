import { useLanguage } from '../../context/LanguageContext'
import { formatPrice } from '../../utils'

interface OrderSummaryProps {
  route: string
  train: string
  seats: string
  passengerCount: number
  total: number
  className?: string
}

export function OrderSummary({ route, train, seats, passengerCount, total, className = '' }: OrderSummaryProps) {
  const { t } = useLanguage()
  const rows = [
    { label: t('summary_route'),      value: route },
    { label: t('summary_train'),      value: train },
    { label: t('summary_seats'),      value: seats },
    { label: t('summary_passengers'), value: String(passengerCount) },
  ]
  return (
    <div className={`ui-card p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-slate-900">{t('summary_title')}</h3>
      <dl className="mt-4 space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <dt className="text-slate-500">{row.label}</dt>
            <dd className="text-right font-medium text-slate-900">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
        <span className="text-sm font-medium text-slate-700">{t('summary_total')}</span>
        <span className="text-lg font-semibold text-emerald-700">{formatPrice(total)}</span>
      </div>
    </div>
  )
}
