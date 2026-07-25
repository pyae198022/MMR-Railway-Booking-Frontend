import { BookingProvider, useBooking } from './context/BookingContext'
import { Layout } from './components/layout/Layout'
import { TicketConfirmation } from './components/confirmation/TicketConfirmation'
import { PassengerForm } from './components/passenger/PassengerForm'
import { PaymentForm } from './components/payment/PaymentForm'
import { TrainResults } from './components/results/TrainResults'
import { SearchForm } from './components/search/SearchForm'
import { SeatGrid } from './components/seats/SeatGrid'

function BookingFlow() {
  const { step } = useBooking()

  switch (step) {
    case 'search':
      return <SearchForm />
    case 'results':
      return <TrainResults />
    case 'seats':
      return <SeatGrid />
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
        <BookingFlow />
      </Layout>
    </BookingProvider>
  )
}

export default App
