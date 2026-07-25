import { BookingProvider, useBooking } from './context/BookingContext'
import { Layout } from './components/layout/Layout'
import { TicketConfirmation } from './components/confirmation/TicketConfirmation'
import { ProfilePage } from './components/account/ProfilePage'
import { RegistrationForm } from './components/account/RegistrationForm'
import { PassengerForm } from './components/passenger/PassengerForm'
import { PaymentForm } from './components/payment/PaymentForm'
import { TrainResults } from './components/results/TrainResults'
import { SearchForm } from './components/search/SearchForm'
import { SeatGrid } from './components/seats/SeatGrid'
import { VerificationForm } from './components/verification/VerificationForm'

function AppContent() {
  const { appView, step } = useBooking()

  if (appView === 'register') return <RegistrationForm />
  if (appView === 'profile') return <ProfilePage />

  switch (step) {
    case 'search':
      return <SearchForm />
    case 'results':
      return <TrainResults />
    case 'seats':
      return <SeatGrid />
    case 'verification':
      return <VerificationForm />
    case 'passengers':
      return <PassengerForm />
    case 'payment':
      return <PaymentForm />
    case 'confirmation':
      return <TicketConfirmation />
    default:
      return <SearchForm />
  }
}

function App() {
  return (
    <BookingProvider>
      <Layout>
        <AppContent />
      </Layout>
    </BookingProvider>
  )
}

export default App
