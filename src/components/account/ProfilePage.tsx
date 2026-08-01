import { useBooking } from "../../context/BookingContext"
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, getStationById } from '../../utils'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { PageHeader } from '../ui/PageHeader'

export function ProfilePage() {
  const { bookingHistory, logoutUser, openTicketByReference, resetBooking, setAppView, userProfile } = useBooking()
  const { t, lang } = useLanguage()

  if (!userProfile) return null

  const startBooking = () => { resetBooking(); setAppView('booking') }

  const ticketCount = bookingHistory.length
  const ticketLabel = lang === 'mm'
    ? `${ticketCount} ${t('profile_tickets')}`
    : `${ticketCount} ${ticketCount === 1 ? t('profile_ticket') : t('profile_tickets')}`

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('profile_title')}
        description={t('profile_desc')}
        backLabel={t('profile_book_ticket')}
        onBack={startBooking}
        action={
          <Button variant="secondary" onClick={() => setAppView('register')}>
            {t('profile_edit')}
          </Button>
        }
      />

      <Card>
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">{t('profile_name')}</dt>
            <dd className="mt-1 font-medium text-slate-900">{userProfile.fullName}</dd>
          </div>
          <div>
            <dt className="text-slate-500">{t('profile_phone')}</dt>
            <dd className="mt-1 font-medium text-slate-900">{userProfile.phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">{t('profile_nrc')}</dt>
            <dd className="mt-1 font-medium text-slate-900">{userProfile.nrc || t('profile_not_added')}</dd>
          </div>
        </dl>
      </Card>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">{t('profile_saved_tickets')}</h2>
            <p className="mt-1 text-sm text-slate-500">{t('profile_tickets_note')}</p>
          </div>
          <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
            {ticketLabel}
          </span>
        </div>

        {bookingHistory.length === 0 ? (
          <Card className="text-center">
            <p className="font-medium text-slate-900">{t('profile_no_tickets')}</p>
            <Button className="mt-4" onClick={startBooking}>{t('profile_start_booking')}</Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {bookingHistory.map((ticket) => {
              const from = getStationById(ticket.searchQuery.fromStationId)
              const to   = getStationById(ticket.searchQuery.toStationId)
              const fromName = lang === 'mm' ? (from?.nameMm ?? from?.name) : from?.name
              const toName   = lang === 'mm' ? (to?.nameMm   ?? to?.name)   : to?.name
              return (
                <Card key={ticket.id} className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{fromName} {t('profile_to')} {toName}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {ticket.train.name} · {ticket.reference} · {formatPrice(ticket.totalPrice)}
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => openTicketByReference(ticket.reference)}>
                    {t('profile_view_ticket')}
                  </Button>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={logoutUser}
        className="text-sm font-medium text-red-600 transition hover:text-red-700"
      >
        {t('profile_signout')}
      </button>
    </div>
  )
}
