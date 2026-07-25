import { formatPrice, getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { PageHeader } from '../ui/PageHeader'

export function ProfilePage() {
  const {
    bookingHistory,
    logoutUser,
    openTicketByReference,
    resetBooking,
    setAppView,
    userProfile,
  } = useBooking()

  if (!userProfile) return null

  const startBooking = () => {
    resetBooking()
    setAppView('booking')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My profile"
        description="Your locally saved account and ticket history."
        backLabel="Book a ticket"
        onBack={startBooking}
        action={
          <Button variant="secondary" onClick={() => setAppView('register')}>
            Edit profile
          </Button>
        }
      />

      <Card>
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="mt-1 font-medium text-slate-900">{userProfile.fullName}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone</dt>
            <dd className="mt-1 font-medium text-slate-900">{userProfile.phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">NRC</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {userProfile.nrc || 'Not added'}
            </dd>
          </div>
        </dl>
      </Card>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Saved tickets</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tickets booked in this browser are shown here.
            </p>
          </div>
          <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
            {bookingHistory.length} ticket{bookingHistory.length === 1 ? '' : 's'}
          </span>
        </div>

        {bookingHistory.length === 0 ? (
          <Card className="text-center">
            <p className="font-medium text-slate-900">No saved tickets yet</p>
            <Button className="mt-4" onClick={startBooking}>
              Start booking
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {bookingHistory.map((ticket) => {
              const from = getStationById(ticket.searchQuery.fromStationId)
              const to = getStationById(ticket.searchQuery.toStationId)

              return (
                <Card key={ticket.id} className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {from?.name} to {to?.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {ticket.train.name} · {ticket.reference} · {formatPrice(ticket.totalPrice)}
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => openTicketByReference(ticket.reference)}>
                    View ticket
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
        Sign out of this browser
      </button>
    </div>
  )
}
