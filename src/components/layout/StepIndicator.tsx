import type { BookingStep } from '../../types'

const visibleSteps: { key: BookingStep; label: string }[] = [
  { key: 'results', label: 'Trains' },
  { key: 'seats', label: 'Seats' },
  { key: 'passengers', label: 'Details' },
  { key: 'payment', label: 'Payment' },
]

interface StepIndicatorProps {
  currentStep: BookingStep
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = visibleSteps.findIndex((s) => s.key === currentStep)
  if (currentIndex < 0) return null

  return (
    <nav aria-label="Booking progress" className="overflow-x-auto border-b border-slate-200 pb-3">
      <ol className="flex min-w-max items-center gap-3 text-sm">
        {visibleSteps.map((step, index) => {
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
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
