import { TrainIcon, MapPinIcon, ClockIcon, CreditCardIcon, ShieldCheckIcon, UsersIcon } from '../icons'

interface MyanmarRailwayInfoProps {
  lang?: 'en' | 'mm'
}

export function MyanmarRailwayInfo({ lang = 'en' }: MyanmarRailwayInfoProps) {
  const info = {
    en: {
      title: "Myanmar Railways Online Booking",
      subtitle: "Official Partner System for Myanmar Railway Tickets",
      features: [
        {
          title: "Wide Network",
          description: "Book trains across major cities in Myanmar including Yangon, Mandalay, Naypyitaw, Bago, Mawlamyine, and more.",
          icon: <MapPinIcon size={20} />
        },
        {
          title: "Multiple Train Types",
          description: "Express, Special, Local, and Scenic trains available with different classes and amenities.",
          icon: <TrainIcon size={20} />
        },
        {
          title: "Flexible Booking",
          description: "Book up to 30 days in advance with easy cancellation and refund options.",
          icon: <ClockIcon size={20} />
        },
        {
          title: "Secure Payment",
          description: "Multiple payment options with secure encryption and instant confirmation.",
          icon: <CreditCardIcon size={20} />
        },
        {
          title: "Verified Service",
          description: "Official Myanmar Railways partner system with authenticated station data and schedules.",
          icon: <ShieldCheckIcon size={20} />
        },
        {
          title: "Passenger Benefits",
          description: "Discounts for students, seniors, and special categories with transparent fare structure.",
          icon: <UsersIcon size={20} />
        }
      ],
      stations: {
        title: "Major Stations",
        list: [
          { code: "YGN", name: "Yangon Central", city: "Yangon" },
          { code: "MDY", name: "Mandalay", city: "Mandalay" },
          { code: "NPT", name: "Naypyitaw", city: "Naypyitaw" },
          { code: "BGN", name: "Bago", city: "Bago" },
          { code: "MAW", name: "Mawlamyine", city: "Mon State" },
          { code: "MYK", name: "Myitkyina", city: "Kachin State" }
        ]
      },
      contact: {
        title: "Contact Information",
        phone: "+95-1-XXXXXXX",
        email: "info@myanmarrailways.gov.mm",
        website: "ort.railways.gov.mm"
      }
    },
    mm: {
      title: "မြန်မာ့မီးရထား အွန်လိုင်း လက်မှတ်ရောင်း",
      subtitle: "မြန်မာ့မီးရထား ရုံးများနှင့် ပူးပေါင်းဆောင်ရွက်သည့် အွန်လိုင်းစနစ်",
      features: [
        {
          title: "ကျယ်ပြန့်သော ကွန်ယက်",
          description: "ရန်ကုန်၊ မန္တလေး၊ နေပြည်တော်၊ ပဲခူး၊ မော်လမြိုင်နှင့် မြို့ကြီးများအကြား မီးရထားလက်မှတ်များ ဝယ်ယူရန်။",
          icon: <MapPinIcon size={20} />
        },
        {
          title: "မီးရထားအမျိုးအစားစုံ",
          description: "အမြန်ရထား၊ သီးသန့်ရထား၊ ဒေသစည်း နှင့် ခရီးသွားများအတွက် ရထားများ ရရှိနိုင်ပါသည်။",
          icon: <TrainIcon size={20} />
        },
        {
          title: "လွယ်ကူသော လက်မှတ်ဝယ်ယူနည်း",
          description: "ရက် ၃၀ ကြိုတင် လက်မှတ်ဝယ်ယူနိုင်ပြီး ပြန်လည်ဖျက်သိမ်းခြင်း၊ ငွေပြန်အမ်းခြင်းများ ရရှိနိုင်သည်။",
          icon: <ClockIcon size={20} />
        },
        {
          title: "လုံခြုံသော ငွေပေးချေမှု",
          description: "ငွေပေးချေရန် နည်းလမ်းများစွာရှိပြီး လုံခြုံသော လျှို့ဝှက်ကုဒ်ဖြင့် ချက်ချင်းအတည်ပြုပေးသည်။",
          icon: <CreditCardIcon size={20} />
        },
        {
          title: "အတည်ပြုထားသော ဝန်ဆောင်မှု",
          description: "မြန်မာ့မီးရထားနှင့် တရားဝင်ပူးပေါင်းဆောင်ရွက်ထားပြီး ဘူတာရုံအချက်အလက်များ မှန်ကန်စွာရရှိနိုင်သည်။",
          icon: <ShieldCheckIcon size={20} />
        },
        {
          title: "ခရီးသည်များအတွက် အကျိုးကျေးဇူးများ",
          description: "ကျောင်းသား၊ အသက်ကြီးသူများနှင့် အထူးအမျိုးအစားများအတွက် ဈေးလျှော့ပေးမှုများ ရရှိနိုင်သည်။",
          icon: <UsersIcon size={20} />
        }
      ],
      stations: {
        title: "အဓိကဘူတာရုံများ",
        list: [
          { code: "YGN", name: "ရန်ကုန် အဓိကဘူတာ", city: "ရန်ကုန်" },
          { code: "MDY", name: "မန္တလေး ဘူတာရုံ", city: "မန္တလေး" },
          { code: "NPT", name: "နေပြည်တော် ဘူတာရုံ", city: "နေပြည်တော်" },
          { code: "BGN", name: "ပဲခူး ဘူတာရုံ", city: "ပဲခူး" },
          { code: "MAW", name: "မော်လမြိုင် ဘူတာရုံ", city: "မွန်ပြည်နယ်" },
          { code: "MYK", name: "မြစ်ကြီးနား ဘူတာရုံ", city: "ကချင်ပြည်နယ်" }
        ]
      },
      contact: {
        title: "ဆက်သွယ်ရန်",
        phone: "1188",
        email: "info@myanmarrailways.gov.mm",
        website: "ort.railways.gov.mm"
      }
    }
  }

  const content = info[lang]

  return (
    <div className="myanmar-railway-info">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{content.title}</h2>
        <p className="text-slate-600">{content.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {content.features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
            </div>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">{content.stations.title}</h3>
          <div className="space-y-3">
            {content.stations.list.map((station, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-medium text-slate-900">{station.name}</div>
                  <div className="text-sm text-slate-500">{station.city}</div>
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md font-mono text-sm font-medium">
                  {station.code}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">{content.contact.title}</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-slate-500">Phone</div>
                <div className="font-medium text-slate-900">{content.contact.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-slate-500">Email</div>
                <div className="font-medium text-slate-900">{content.contact.email}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-slate-500">Official Website</div>
                <a href={`https://${content.contact.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-700">
                  {content.contact.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .myanmar-railway-info {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .myanmar-railway-info h2 {
          background: linear-gradient(135deg, #0f766e 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  )
}