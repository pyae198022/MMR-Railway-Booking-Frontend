import { useEffect, useMemo, useState } from 'react'
import { getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import type { Passenger } from '../../types'
import { formatNrcHint, validateNrc } from '../../utils/nrc'
import { ArrowRightIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { FieldLabel, TextInput } from '../ui/Field'
import { OrderSummary } from '../ui/OrderSummary'
import { PageHeader } from '../ui/PageHeader'

function createPassengerForms(
  count: number,
  passengers: Passenger[],
  primaryPassenger: Passenger | null,
): Passenger[] {
  return Array.from({ length: count }, (_, index) => ({
    name: index === 0 && primaryPassenger ? primaryPassenger.name : passengers[index]?.name ?? '',
    nrc: index === 0 && primaryPassenger ? primaryPassenger.nrc : passengers[index]?.nrc ?? '',
  }))
}

export function PassengerForm() {
  const {
    searchQuery,
    selectedTrain,
    selectedClass,
    selectedSeats,
    passengers,
    userProfile,
    verifiedUser,
    setPassengers,
    goToStep,
    totalPrice,
  } = useBooking()

  const count = searchQuery?.passengerCount ?? 1
  const profilePassenger = useMemo(
    () =>
      userProfile?.fullName && userProfile.nrc
        ? { name: userProfile.fullName, nrc: userProfile.nrc }
        : null,
    [userProfile],
  )
  const primaryPassenger = useMemo(
    () => profilePassenger ?? verifiedUser,
    [profilePassenger, verifiedUser],
  )
  const [forms, setForms] = useState<Passenger[]>(
    createPassengerForms(count, passengers, primaryPassenger),
  )
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    setForms(createPassengerForms(count, passengers, primaryPassenger))
  }, [count, passengers, primaryPassenger])

  if (!selectedTrain || !selectedClass || !searchQuery) return null

  const from = getStationById(selectedTrain.fromStationId)
  const to = getStationById(selectedTrain.toStationId)
  const classLabel =
    selectedTrain.classes.find((c) => c.type === selectedClass)?.label ?? selectedClass

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    forms.forEach((p, i) => {
      if (!p.name.trim()) newErrors[i] = 'Name is required'
      else if (!validateNrc(p.nrc)) newErrors[i] = `Use format ${formatNrcHint()}`
    })

    setErrors(newErrors)
    if (newErrors.some(Boolean)) return

    setPassengers(forms)
    goToStep('payment')
  }

  const updateForm = (index: number, field: keyof Passenger, value: string) => {
    setForms((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    )
    setErrors((prev) => prev.map((e, i) => (i === index ? '' : e)))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PageHeader
          title="Passenger details"
          description={`Information for ${count} traveler${count > 1 ? 's' : ''}`}
          backLabel="Back"
          onBack={() => goToStep('seats')}
        />

        <form onSubmit={handleSubmit} className="space-y-3">
          {forms.map((passenger, index) => (
            <Card key={index} padding="sm">
              <p className="mb-3 text-sm font-medium text-slate-900">
                Passenger {index + 1}
                {selectedSeats[index] && (
                  <span className="ml-2 font-normal text-slate-500">
                    · Seat {selectedSeats[index]}
                  </span>
                )}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <FieldLabel>Full name</FieldLabel>
                  <TextInput
                    value={passenger.name}
                    onChange={(e) => updateForm(index, 'name', e.target.value)}
                    placeholder="Aung Aung"
                    disabled={index === 0 && profilePassenger !== null}
                  />
                </div>
                <div>
                  <FieldLabel>NRC</FieldLabel>
                  <TextInput
                    value={passenger.nrc}
                    onChange={(e) => updateForm(index, 'nrc', e.target.value)}
                    placeholder={formatNrcHint()}
                    disabled={index === 0 && profilePassenger !== null}
                  />
                </div>
              </div>
              {index === 0 && profilePassenger && (
                <p className="mt-3 text-xs text-emerald-700">
                  Primary passenger details are taken from your signed-in profile.
                </p>
              )}
              {errors[index] && (
                <p className="mt-2 text-sm text-red-600">{errors[index]}</p>
              )}
            </Card>
          ))}

          <div className="flex justify-end pt-2">
            <Button type="submit">
              Continue to payment
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </form>
      </div>

      <OrderSummary
        className="h-fit lg:sticky lg:top-6"
        route={`${from?.name} → ${to?.name}`}
        train={`${selectedTrain.name} (${classLabel})`}
        seats={selectedSeats.join(', ')}
        passengerCount={count}
        total={totalPrice}
      />
    </div>
  )
}
