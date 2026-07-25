import { useState } from 'react'
import { getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import { formatNrcHint, validateNrc } from '../../utils/nrc'
import { ArrowRightIcon, ShieldCheckIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { FieldLabel, TextInput } from '../ui/Field'
import { OrderSummary } from '../ui/OrderSummary'
import { PageHeader } from '../ui/PageHeader'

export function VerificationForm() {
  const {
    searchQuery,
    selectedTrain,
    selectedClass,
    selectedSeats,
    verifiedUser,
    setVerifiedUser,
    goToStep,
    totalPrice,
  } = useBooking()

  const [name, setName] = useState(verifiedUser?.name ?? '')
  const [nrc, setNrc] = useState(verifiedUser?.nrc ?? '')
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(!!verifiedUser)

  if (!selectedTrain || !selectedClass || !searchQuery) return null

  const from = getStationById(selectedTrain.fromStationId)
  const to = getStationById(selectedTrain.toStationId)
  const classLabel =
    selectedTrain.classes.find((c) => c.type === selectedClass)?.label ?? selectedClass

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Full name is required.')
      return
    }
    if (!validateNrc(nrc)) {
      setError(`Invalid NRC format. Example: ${formatNrcHint()}`)
      return
    }
    setError('')
    setVerifiedUser({
      name: name.trim(),
      nrc: nrc.trim(),
      verifiedAt: new Date().toISOString(),
    })
    setVerified(true)
  }

  const handleContinue = () => {
    goToStep('passengers')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PageHeader
          title="Identity verification"
          description="Verify your Myanmar NRC to continue booking"
          backLabel="Back to seats"
          onBack={() => goToStep('seats')}
        />

        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <ShieldCheckIcon size={18} className="text-emerald-600" />
              Primary passenger verification
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Required for all Myanmar Railways online bookings (mock validation).
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4 p-5">
            <div>
              <FieldLabel>Full name (as on NRC)</FieldLabel>
              <TextInput
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setVerified(false)
                }}
                placeholder="Aung Aung"
                disabled={verified}
              />
            </div>
            <div>
              <FieldLabel>NRC number</FieldLabel>
              <TextInput
                value={nrc}
                onChange={(e) => {
                  setNrc(e.target.value)
                  setVerified(false)
                }}
                placeholder={formatNrcHint()}
                disabled={verified}
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Format: township code / name (parent) + 6 digits
              </p>
            </div>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            {verified && (
              <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800">
                <ShieldCheckIcon size={16} />
                NRC verified successfully
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              {!verified ? (
                <Button type="submit">
                  Verify NRC
                  <ShieldCheckIcon size={16} />
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setVerified(false)}
                  >
                    Edit details
                  </Button>
                  <Button type="button" onClick={handleContinue}>
                    Continue to passenger details
                    <ArrowRightIcon size={16} />
                  </Button>
                </>
              )}
            </div>
          </form>
        </Card>
      </div>

      <OrderSummary
        className="h-fit lg:sticky lg:top-6"
        route={`${from?.name} → ${to?.name}`}
        train={`${selectedTrain.name} (${classLabel})`}
        seats={selectedSeats.join(', ')}
        passengerCount={searchQuery.passengerCount}
        total={totalPrice}
      />
    </div>
  )
}
