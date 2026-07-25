import { useEffect, useState } from 'react'
import { getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import type { Passenger } from '../../types'
import { ArrowRightIcon } from '../icons'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { FieldLabel, TextInput } from '../ui/Field'
import { OrderSummary } from '../ui/OrderSummary'
import { PageHeader } from '../ui/PageHeader'

export function PassengerForm() {
  const {
    searchQuery,
    selectedTrain,
    selectedClass,
    selectedSeats,
    passengers,
    setPassengers,
    goToStep,
    totalPrice,
  } = useBooking()

  const count = searchQuery?.passengerCount ?? 1
  const [forms, setForms] = useState<Passenger[]>(
    passengers.length === count
      ? passengers
      : Array.from({ length: count }, (_, i) => ({
          name: passengers[i]?.name ?? '',
          nrc: passengers[i]?.nrc ?? '',
        })),
  )
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    setForms(
      Array.from({ length: count }, (_, i) => ({
        name: passengers[i]?.name ?? '',
        nrc: passengers[i]?.nrc ?? '',
      })),
    )
  }, [count, passengers])

  if (!selectedTrain || !selectedClass || !searchQuery) return null

  const from = getStationById(selectedTrain.fromStationId)
  const to = getStationById(selectedTrain.toStationId)
  const classLabel =
    selectedTrain.classes.find((c) => c.type === selectedClass)?.label ?? selectedClass

  const validateNrc = (nrc: string) =>
    /^\d{1,2}\/[A-Za-z]+\(N\)\d{6}$/.test(nrc.trim())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    forms.forEach((p, i) => {
      if (!p.name.trim()) newErrors[i] = 'Name is required'
      else if (!validateNrc(p.nrc)) newErrors[i] = 'Use format 12/ABC(N)123456'
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
                  />
                </div>
                <div>
                  <FieldLabel>NRC</FieldLabel>
                  <TextInput
                    value={passenger.nrc}
                    onChange={(e) => updateForm(index, 'nrc', e.target.value)}
                    placeholder="12/ABC(N)123456"
                  />
                </div>
              </div>
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
