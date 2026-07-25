import { useLanguage } from '../../context/LanguageContext'
import type { BookingStep } from '../../types'

const stepKeys: { key: BookingStep; labelKey: 'step_trains' | 'step_seats' | 'step_verify' | 'step_details' | 'step_payment' }[] = [
  { key: 'results',      labelKey: 'step_trains' },
  { key: 'seats',        labelKey: 'step_seats' },
  { key: 'verification', labelKey: 'step_verify' },
  { key: 'passengers',   labelKey: 'step_details' },
  { key: 'payment',      labelKey: 'step_payment' },
]

interface StepIndicatorProps {
  currentStep: BookingStep
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useLanguage()
  const currentIndex = stepKeys.findIndex((s) => s.key === currentStep)
  if (currentIndex < 0) return null

  return (
    <nav aria-label="Booking progress" className="overflow-x-auto border-b border-slate-200 pb-3">
      <ol className="flex min-w-max items-center gap-3 text-sm">
        {stepKeys.map((step, index) => {
          const isComplete = index < currentIndex
          const isCurrent = index === currentIndex
          return (
            <li key={step.key} className="flex items-center gap-3">
              {index > 0 && (
                <span
                  className={`h-px w-6 ${isComplete ? 'bg-emerald-600' : 'bg-slate-200'}`}
                  aria-hidden
                />
              )}
              <span
                className={
                  isCurrent
                    ? 'font-semibold text-emerald-700'
                    : isComplete
                      ? 'text-slate-700'
                      : 'text-slate-400'
                }
              >
                {t(step.labelKey)}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
