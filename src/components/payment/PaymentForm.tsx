import { useState } from 'react'
import { formatPrice, getStationById } from '../../data/mockData'
import { useBooking } from '../../context/BookingContext'
import { useLanguage } from '../../context/LanguageContext'
import type { PaymentMethod } from '../../types'
import { CreditCardIcon, LoaderIcon, QrCodeIcon, ShieldCheckIcon } from '../icons'
import { MockQRCode } from '../confirmation/MockQRCode'
import { OrderSummary } from '../ui/OrderSummary'
import { PageHeader } from '../ui/PageHeader'
import { PaymentCountdown } from './PaymentCountdown'

const paymentOptions: { id: PaymentMethod; name: string; desc: { mm: string; en: string }; accent: string }[] = [
  { id: 'kbzpay', name: 'KBZPay', desc: { mm: 'KBZ ဘဏ် မိုဘိုင်းပိုက်ဆံအိတ်', en: 'KBZ Bank mobile wallet'      }, accent: 'border-blue-500 ring-blue-500/20' },
  { id: 'cbpay',  name: 'CB Pay',  desc: { mm: 'CB ဘဏ် မိုဘိုင်းငွေပေးချေမှု', en: 'CB Bank mobile payment'      }, accent: 'border-violet-500 ring-violet-500/20' },
  { id: 'mmqr',   name: 'MMQR',   desc: { mm: 'မြန်မာ QR ငွေပေးချေမှုစနစ်',    en: 'Myanmar national QR standard'}, accent: 'border-emerald-500 ring-emerald-500/20' },
]

function paymentLabel(method: PaymentMethod): string {
  return paymentOptions.find((p) => p.id === method)?.name ?? method
}

export function PaymentForm() {
  const { selectedTrain, selectedClass, searchQuery, selectedSeats, passengers, paymentMethod, setPaymentMethod, processPayment, isProcessingPayment, totalPrice, reservationSecondsLeft, reservationExpired, goToStep, ticket } = useBooking()
  const { t, lang } = useLanguage()
  const [verifyPending, setVerifyPending] = useState(false)

  if (!selectedTrain || !selectedClass || !searchQuery) return null

  const from = getStationById(selectedTrain.fromStationId)
  const to   = getStationById(selectedTrain.toStationId)
  const classLabel = selectedTrain.classes.find((c) => c.type === selectedClass)?.label ?? selectedClass
  const qrPayload = ticket?.reference ?? `MMR-PAY-${totalPrice}-${paymentMethod}`

  const handleVerifyPayment = async () => {
    if (!paymentMethod || reservationExpired) return
    setVerifyPending(true)
    await processPayment()
    setVerifyPending(false)
  }

  const busy = isProcessingPayment || verifyPending

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <PageHeader
          title={t('pay_title')}
          description={t('pay_desc')}
          backLabel={t('pay_back')}
          onBack={() => !busy && goToStep('passengers')}
        />

        <PaymentCountdown secondsLeft={reservationSecondsLeft} expired={reservationExpired} />

        <div className="space-y-2">
          {paymentOptions.map((option) => {
            const selected = paymentMethod === option.id
            return (
              <button
                key={option.id}
                type="button"
                disabled={busy || reservationExpired}
                onClick={() => setPaymentMethod(option.id)}
                className={`ui-card flex w-full items-center gap-4 p-4 text-left transition disabled:opacity-50 ${
                  selected ? `border-2 ring-1 ${option.accent}` : 'hover:border-slate-300'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  {option.id === 'mmqr' ? <QrCodeIcon size={20} /> : <CreditCardIcon size={20} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{option.name}</p>
                  <p className="text-xs text-slate-500">{option.desc[lang]}</p>
                </div>
                <span className={`h-4 w-4 rounded-full border-2 ${selected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`} />
              </button>
            )
          })}
        </div>

        {paymentMethod && !reservationExpired && (
          <div className="ui-card overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
              <p className="text-sm font-medium text-slate-800">
                {t('pay_scan')} {paymentLabel(paymentMethod)}
              </p>
              <p className="text-xs text-slate-500">
                {t('pay_mock_qr')} · {t('pay_amount')} {formatPrice(totalPrice)}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 px-5 py-6">
              <MockQRCode data={qrPayload} />
              <p className="text-center text-xs text-slate-500">
                {t('pay_open_app').replace('{method}', paymentLabel(paymentMethod))}
              </p>
              <button
                type="button"
                disabled={busy}
                onClick={handleVerifyPayment}
                className="search-cta group flex w-full max-w-sm items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? (
                  <><LoaderIcon size={18} className="animate-spin" />{t('pay_verifying')}</>
                ) : (
                  <><ShieldCheckIcon size={18} />{t('pay_verify')}</>
                )}
              </button>
            </div>
          </div>
        )}

        {reservationExpired && (
          <button type="button" onClick={() => goToStep('seats')} className="ui-btn-secondary w-full py-3">
            {t('pay_expired_back')}
          </button>
        )}
      </div>

      <OrderSummary
        className="h-fit lg:sticky lg:top-6"
        route={`${from?.name} → ${to?.name}`}
        train={`${selectedTrain.name} (${classLabel})`}
        seats={selectedSeats.join(', ')}
        passengerCount={passengers.length}
        total={totalPrice}
      />
    </div>
  )
}

export { paymentLabel }
