import { useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { useLanguage } from '../../context/LanguageContext'
import { formatNrcHint, validateNrc } from '../../utils/nrc'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { FieldLabel, TextInput } from '../ui/Field'
import { PageHeader } from '../ui/PageHeader'

export function RegistrationForm() {
  const { registerUser, setAppView, userProfile } = useBooking()
  const { t, lang } = useLanguage()
  const [fullName, setFullName] = useState(userProfile?.fullName ?? '')
  const [phone,    setPhone]    = useState(userProfile?.phone    ?? '')
  const [nrc,      setNrc]      = useState(userProfile?.nrc      ?? '')
  const [error,    setError]    = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!fullName.trim()) {
      setError(lang === 'mm' ? 'အမည် ထည့်ရန် လိုအပ်သည်' : 'Full name is required.')
      return
    }
    if (!/^[0-9+\-\s]{7,20}$/.test(phone.trim())) {
      setError(lang === 'mm' ? 'မှန်ကန်သောဖုန်းနံပါတ် ထည့်ပါ' : 'Enter a valid phone number.')
      return
    }
    if (nrc.trim() && !validateNrc(nrc)) {
      setError(`${lang === 'mm' ? 'မှတ်ပုံတင်ပုံစံ:' : 'Use NRC format'} ${formatNrcHint()}`)
      return
    }
    registerUser({ fullName: fullName.trim(), phone: phone.trim(), nrc: nrc.trim() })
  }

  return (
    <div className="mx-auto max-w-lg">
      <PageHeader
        title={userProfile ? t('reg_title_edit') : t('reg_title_new')}
        description={t('reg_desc')}
        backLabel={t('reg_back_booking')}
        onBack={() => setAppView(userProfile ? 'profile' : 'booking')}
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>{t('reg_fullname')}</FieldLabel>
            <TextInput value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Aung Aung" autoComplete="name" />
          </div>
          <div>
            <FieldLabel>{t('reg_phone')}</FieldLabel>
            <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09 123 456 789" autoComplete="tel" inputMode="tel" />
          </div>
          <div>
            <FieldLabel>{t('reg_nrc')}</FieldLabel>
            <TextInput value={nrc} onChange={(e) => setNrc(e.target.value)} placeholder={formatNrcHint()} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <p className="rounded-md bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800">
            {t('reg_demo_note')}
          </p>

          <Button type="submit" fullWidth>
            {userProfile ? t('reg_save') : t('reg_create')}
          </Button>
        </form>
      </Card>
    </div>
  )
}
