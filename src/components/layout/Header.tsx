import { useLanguage } from '../../context/LanguageContext'
import { useBooking } from '../../context/BookingContext'

/**
 * Myanma Railways official-style shield logo mark.
 * – Shield shape with top-arch banner
 * – Bold "MR" monogram centred on the shield
 * – Gold double-rail track across the lower third
 * – Myanmar national red (#CE1126) + gold (#D4A017) palette
 */
function MRShieldLogo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.1)}
      viewBox="0 0 80 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Myanma Railways shield emblem"
    >
      <path
        d="M40 2 L76 14 L76 50 C76 68 40 86 40 86 C40 86 4 68 4 50 L4 14 Z"
        fill="#CE1126"
        stroke="#D4A017"
        strokeWidth="2.5"
      />
      <path d="M12 14 L68 14 L68 24 Q40 30 12 24 Z" fill="#D4A017" />
      <text x="40" y="23" textAnchor="middle" fontSize="8" fontWeight="800" fill="#CE1126"
        fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="3">M R</text>
      <text x="40" y="54" textAnchor="middle" fontSize="30" fontWeight="900" fill="#ffffff"
        fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="-1">MR</text>
      <line x1="12" y1="62" x2="68" y2="62" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="67" x2="68" y2="67" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
      {[18, 26, 34, 42, 50, 58].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="69" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      <text x="26" y="78" textAnchor="middle" fontSize="8" fill="#D4A017">★</text>
      <text x="40" y="80" textAnchor="middle" fontSize="9" fill="#D4A017">★</text>
      <text x="54" y="78" textAnchor="middle" fontSize="8" fill="#D4A017">★</text>
    </svg>
  )
}

export function Header() {
  const { appView, resetBooking, setAppView, step, userProfile } = useBooking()
  const { lang, setLang, t } = useLanguage()
  const onHero = appView === 'booking' && step === 'search'

  const startBooking = () => {
    resetBooking()
    setAppView('booking')
  }

  const btnBase = onHero
    ? 'rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 backdrop-blur-sm'
    : 'rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50'

  return (
    <header
      className={
        onHero
          ? 'absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-900/20 backdrop-blur-md'
          : 'border-b border-slate-200 bg-white shadow-sm'
      }
    >
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-2 sm:px-6">

        {/* ── Logo ── */}
        <button
          type="button"
          onClick={startBooking}
          className="flex shrink-0 items-center gap-3 rounded-xl py-0.5 transition hover:opacity-90 active:scale-95"
          aria-label="Myanma Railways – home"
        >
          <div className={`drop-shadow-md transition ${onHero ? 'brightness-110' : ''}`}>
            <MRShieldLogo size={46} />
          </div>
          <div className="text-left leading-none">
            <p
              className={`text-base font-extrabold tracking-tight ${onHero ? 'text-white' : 'text-[#CE1126]'}`}
              style={{ fontFamily: "'Pyidaungsu', 'Padauk', 'Myanmar3', serif" }}
            >
              မြန်မာ့မီးရထား
            </p>
            <p className={`mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${onHero ? 'text-amber-300' : 'text-[#D4A017]'}`}>
              Myanma Railways
            </p>
            <p className={`text-[9px] font-medium tracking-wide ${onHero ? 'text-slate-300' : 'text-slate-500'}`}>
              {t('header_tagline')}
            </p>
          </div>
        </button>

        <div className="flex-1" />

        {/* ── MM | EN toggle ── */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-0.5 rounded-lg p-0.5 text-[11px] font-bold ${
              onHero ? 'bg-white/10 ring-1 ring-white/20' : 'bg-slate-100 ring-1 ring-slate-200'
            }`}
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => setLang('mm')}
              aria-pressed={lang === 'mm'}
              aria-label="Switch to Myanmar"
              className={`rounded-md px-3 py-1.5 transition ${
                lang === 'mm'
                  ? onHero ? 'bg-[#CE1126]/80 text-white shadow-sm' : 'bg-[#CE1126] text-white shadow-sm'
                  : onHero ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              MM
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              aria-label="Switch to English"
              className={`rounded-md px-3 py-1.5 transition ${
                lang === 'en'
                  ? onHero ? 'bg-[#CE1126]/80 text-white shadow-sm' : 'bg-[#CE1126] text-white shadow-sm'
                  : onHero ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
          </div>

          {userProfile ? (
            <button type="button" onClick={() => setAppView('profile')} className={btnBase}>
              {userProfile.fullName.split(' ')[0]}
            </button>
          ) : (
            <button type="button" onClick={() => setAppView('register')} className={btnBase}>
              {t('header_signup')}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
