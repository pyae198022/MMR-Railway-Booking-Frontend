import type { ReactNode } from 'react'
import { useBooking } from '../../context/BookingContext'
import { Footer } from './Footer'
import { Header } from './Header'
import { StepIndicator } from './StepIndicator'

export function Layout({ children }: { children: ReactNode }) {
  const { step } = useBooking()

  const isHero = step === 'search'

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className={isHero ? 'relative flex min-h-screen flex-col' : 'flex min-h-screen flex-col'}>
        <Header />
      <main
        className={
          isHero
            ? 'w-full flex-1'
            : 'mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6'
        }
      >
        {!isHero && step !== 'confirmation' && (
          <div className="mb-6">
            <StepIndicator currentStep={step} />
          </div>
        )}
        {children}
      </main>
      {!isHero && <Footer />}
      </div>
    </div>
  )
}
