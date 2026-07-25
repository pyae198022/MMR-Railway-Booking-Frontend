import { useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { formatNrcHint, validateNrc } from '../../utils/nrc'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { FieldLabel, TextInput } from '../ui/Field'
import { PageHeader } from '../ui/PageHeader'

export function RegistrationForm() {
  const { registerUser, setAppView, userProfile } = useBooking()
  const [fullName, setFullName] = useState(userProfile?.fullName ?? '')
  const [phone, setPhone] = useState(userProfile?.phone ?? '')
  const [nrc, setNrc] = useState(userProfile?.nrc ?? '')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!fullName.trim()) {
      setError('Full name is required.')
      return
    }
    if (!/^[0-9+\-\s]{7,20}$/.test(phone.trim())) {
      setError('Enter a valid phone number.')
      return
    }
    if (nrc.trim() && !validateNrc(nrc)) {
      setError(`Use NRC format ${formatNrcHint()}.`)
      return
    }

    registerUser({
      fullName: fullName.trim(),
      phone: phone.trim(),
      nrc: nrc.trim(),
    })
  }

  return (
    <div className="mx-auto max-w-lg">
      <PageHeader
        title={userProfile ? 'Edit profile' : 'Create your account'}
        description="Save your details and access tickets from this browser."
        backLabel="Back to booking"
        onBack={() => setAppView(userProfile ? 'profile' : 'booking')}
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>Full name</FieldLabel>
            <TextInput
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Aung Aung"
              autoComplete="name"
            />
          </div>
          <div>
            <FieldLabel>Phone number</FieldLabel>
            <TextInput
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="09 123 456 789"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          <div>
            <FieldLabel>NRC (optional)</FieldLabel>
            <TextInput
              value={nrc}
              onChange={(event) => setNrc(event.target.value)}
              placeholder={formatNrcHint()}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <p className="rounded-md bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800">
            Demo account: details are stored only in this browser. Production registration
            needs server-side phone OTP verification.
          </p>

          <Button type="submit" fullWidth>
            {userProfile ? 'Save profile' : 'Create account'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
