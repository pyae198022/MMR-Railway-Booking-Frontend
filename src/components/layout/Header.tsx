import { useBooking } from '../../context/BookingContext'
import { TrainIcon } from '../icons'

export function Header() {
  const { appView, resetBooking, setAppView, step, userProfile } = useBooking()
  const onHero = appView === 'booking' && step === 'search'
  const buttonClass = onHero
    ? 'rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20'
    : 'rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50'
  const startBooking = () => {
    resetBooking()
    setAppView('booking')
  }

  return (
    <header
      className={
        onHero
          ? 'absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-900/20 backdrop-blur-md'
          : 'border-b border-slate-200 bg-white'
      }
    >
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4 sm:px-6">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-md ${
            onHero ? 'bg-white/15 ring-1 ring-white/20' : 'bg-[#0f2744]'
          }`}
        >
          <TrainIcon size={18} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${onHero ? 'text-white' : 'text-slate-900'}`}>
            MMR Railway
          </p>
          <p className={`text-xs ${onHero ? 'text-slate-300' : 'text-slate-500'}`}>
            Online ticket booking
          </p>
        </div>
        {userProfile ? (
          <div className="flex items-center gap-2">
            <button type="button" onClick={startBooking} className={buttonClass}>
              Book tickets
            </button>
            <button type="button" onClick={() => setAppView('profile')} className={buttonClass}>
              {userProfile.fullName.split(' ')[0]}
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setAppView('register')} className={buttonClass}>
            Create account
          </button>
        )}
      </div>
    </header>
  )
}
