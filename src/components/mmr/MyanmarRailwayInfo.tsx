import { TrainIcon, MapPinIcon, ClockIcon, CreditCardIcon, ShieldCheckIcon, UsersIcon } from '../icons'

interface MyanmarRailwayInfoProps {
  lang?: 'en' | 'mm'
}

export function MyanmarRailwayInfo({ lang = 'en' }: MyanmarRailwayInfoProps) {
  const info = {
    en: {
      badge: 'Official Partner System',
      title: 'Myanmar Railways',
      titleHighlight: 'Online Booking',
      subtitle:
        'Connecting Myanmar\u2019s major cities through a modern, reliable ticketing platform \u2014 book from anywhere, travel everywhere.',
      features: [
        {
          title: 'Wide Network',
          description:
            'Book trains across major cities \u2014 Yangon, Mandalay, Naypyitaw, Bago, Mawlamyine, and more.',
          icon: <MapPinIcon size={18} />,
          accent: '#10b981',
        },
        {
          title: 'Multiple Train Types',
          description:
            'Express, Special, Local, and Scenic trains with Upper, Ordinary, and Sleeper class options.',
          icon: <TrainIcon size={18} />,
          accent: '#3b82f6',
        },
        {
          title: 'Flexible Booking',
          description:
            'Book up to 30 days in advance with easy cancellation and refund options from your profile.',
          icon: <ClockIcon size={18} />,
          accent: '#8b5cf6',
        },
        {
          title: 'Secure Payment',
          description:
            'Multiple payment options including mobile wallets with instant encrypted e-ticket delivery.',
          icon: <CreditCardIcon size={18} />,
          accent: '#f59e0b',
        },
        {
          title: 'Verified Service',
          description:
            'Official Myanmar Railways partner with authenticated station data and real-time schedules.',
          icon: <ShieldCheckIcon size={18} />,
          accent: '#ef4444',
        },
        {
          title: 'Passenger Benefits',
          description:
            'Student, senior, and government discounts with a fully transparent fare structure.',
          icon: <UsersIcon size={18} />,
          accent: '#06b6d4',
        },
      ],
      stations: {
        title: 'Major Stations',
        list: [
          { code: 'RGN', name: 'Yangon Central', city: 'Yangon' },
          { code: 'MDY', name: 'Mandalay', city: 'Mandalay' },
          { code: 'NPT', name: 'Naypyitaw', city: 'Capital' },
          { code: 'BGO', name: 'Bago', city: 'Bago Region' },
          { code: 'MWL', name: 'Mawlamyine', city: 'Mon State' },
          { code: 'MYT', name: 'Myitkyina', city: 'Kachin State' },
        ],
      },
      contact: {
        title: 'Contact Us',
        items: [
          { icon: 'phone', label: 'Hotline', value: '1188', sub: 'Available 24/7' },
          { icon: 'email', label: 'Email', value: 'info@myanmarrailways.gov.mm', sub: 'Reply within 24 hours' },
          { icon: 'web', label: 'Official Website', value: 'ort.railways.gov.mm', sub: 'Online services & schedules', link: 'https://ort.railways.gov.mm' },
        ],
      },
    },
    mm: {
      badge: 'တရားဝင် ပူးပေါင်းဆောင်ရွက်မှု',
      title: 'မြန်မာ့မီးရထား',
      titleHighlight: 'အွန်လိုင်းလက်မှတ်',
      subtitle:
        'မြန်မာနိုင်ငံ၏ မြို့ကြီးများကို ခေတ်မီ၊ ယုံကြည်စိတ်ချရသည့် လက်မှတ်ဝယ်ယူမှုပလပ်ဖောင်းဖြင့် ချိတ်ဆက်ပေးနေပါသည်။',
      features: [
        {
          title: 'ကျယ်ပြန့်သောကွန်ယက်',
          description: 'ရန်ကုန်၊ မန္တလေး၊ နေပြည်တော်၊ ပဲခူး၊ မော်လမြိုင်နှင့် မြို့ကြီးများတွင် ရထားလက်မှတ်ဝယ်ယူနိုင်ပါသည်။',
          icon: <MapPinIcon size={18} />,
          accent: '#10b981',
        },
        {
          title: 'မီးရထားအမျိုးအစားစုံ',
          description: 'အမြန်ရထား၊ သီးသန့်ရထား၊ ဒေသ နှင့် ပထဝီ၀င်ရထားများ အပါအဝင် class အမျိုးမျိုး ရရှိနိုင်သည်။',
          icon: <TrainIcon size={18} />,
          accent: '#3b82f6',
        },
        {
          title: 'လွယ်ကူသောဝယ်ယူမှု',
          description: 'ရက် ၃၀ ကြိုတင်ဝယ်ယူနိုင်ပြီး ပြန်လည်ဖျက်သိမ်းခြင်းနှင့် ငွေပြန်အမ်းခြင်းများ ရရှိနိုင်သည်။',
          icon: <ClockIcon size={18} />,
          accent: '#8b5cf6',
        },
        {
          title: 'လုံခြုံသောငွေပေးချေမှု',
          description: 'မိုဘိုင်းပိုက်ဆံအိတ်များ အပါအဝင် ငွေပေးချေနည်းများစွာဖြင့် လုံခြုံစွာ ချက်ချင်းအတည်ပြုပေးသည်။',
          icon: <CreditCardIcon size={18} />,
          accent: '#f59e0b',
        },
        {
          title: 'အတည်ပြုထားသောဝန်ဆောင်မှု',
          description: 'မြန်မာ့မီးရထားနှင့် တရားဝင်ပူးပေါင်းဆောင်ရွက်ထားပြီး ဘူတာအချက်အလက်များ မှန်ကန်စွာ ရရှိနိုင်သည်။',
          icon: <ShieldCheckIcon size={18} />,
          accent: '#ef4444',
        },
        {
          title: 'ခရီးသည်အကျိုးကျေးဇူးများ',
          description: 'ကျောင်းသား၊ အသက်ကြီးသူများနှင့် အစိုးရဝန်ထမ်းများအတွက် ဈေးလျှော့မှုများ ရရှိနိုင်သည်။',
          icon: <UsersIcon size={18} />,
          accent: '#06b6d4',
        },
      ],
      stations: {
        title: 'အဓိကဘူတာရုံများ',
        list: [
          { code: 'RGN', name: 'ရန်ကုန် အဓိကဘူတာ', city: 'ရန်ကုန်' },
          { code: 'MDY', name: 'မန္တလေး ဘူတာရုံ', city: 'မန္တလေး' },
          { code: 'NPT', name: 'နေပြည်တော် ဘူတာရုံ', city: 'နိုင်ငံတော်မြို့' },
          { code: 'BGO', name: 'ပဲခူး ဘူတာရုံ', city: 'ပဲခူးတိုင်း' },
          { code: 'MWL', name: 'မော်လမြိုင် ဘူတာရုံ', city: 'မွန်ပြည်နယ်' },
          { code: 'MYT', name: 'မြစ်ကြီးနား ဘူတာရုံ', city: 'ကချင်ပြည်နယ်' },
        ],
      },
      contact: {
        title: 'ဆက်သွယ်ရန်',
        items: [
          { icon: 'phone', label: 'ဖုန်းနံပါတ်', value: '1188', sub: '၂၄ နာရီ ဝန်ဆောင်မှု' },
          { icon: 'email', label: 'အီးမေးလ်', value: 'info@myanmarrailways.gov.mm', sub: '၂၄ နာရီအတွင်း ပြန်ကြားပေးပါသည်' },
          { icon: 'web', label: 'တရားဝင်ဝက်ဘ်ဆိုဒ်', value: 'ort.railways.gov.mm', sub: 'အွန်လိုင်းဝန်ဆောင်မှုများ', link: 'https://ort.railways.gov.mm' },
        ],
      },
    },
  }

  const content = info[lang]

  return (
    <div className="mmr-root">

      {/* ── Divider ─────────────────────────────────────────── */}
      <div className="mmr-divider">
        <span className="mmr-divider-line" />
        <span className="mmr-divider-dot" />
        <span className="mmr-divider-line" />
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="mmr-header">
        <span className="mmr-badge">
          <svg className="mmr-badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          {content.badge}
        </span>
        <h2 className="mmr-title">
          {content.title}{' '}
          <span className="mmr-title-accent">{content.titleHighlight}</span>
        </h2>
        <p className="mmr-subtitle">{content.subtitle}</p>
      </div>

      {/* ── Features ────────────────────────────────────────── */}
      <div className="mmr-features">
        {content.features.map((f, i) => (
          <div key={i} className="mmr-feature">
            <span className="mmr-feature-dot" style={{ background: f.accent }} />
            <div className="mmr-feature-icon" style={{ color: f.accent }}>
              {f.icon}
            </div>
            <div>
              <h3 className="mmr-feature-title">{f.title}</h3>
              <p className="mmr-feature-desc">{f.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom: Stations + Contact ───────────────────────── */}
      <div className="mmr-bottom">

        {/* Stations */}
        <div className="mmr-panel">
          <div className="mmr-panel-head">
            <svg className="mmr-panel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="mmr-panel-title">{content.stations.title}</h3>
          </div>
          <div className="mmr-stations">
            {content.stations.list.map((st, i) => (
              <div key={i} className="mmr-station">
                <span className="mmr-station-code">{st.code}</span>
                <div className="mmr-station-text">
                  <span className="mmr-station-name">{st.name}</span>
                  <span className="mmr-station-city">{st.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mmr-panel">
          <div className="mmr-panel-head">
            <svg className="mmr-panel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 className="mmr-panel-title">{content.contact.title}</h3>
          </div>
          <div className="mmr-contacts">
            {content.contact.items.map((c, i) => (
              <div key={i} className="mmr-contact">
                <div className="mmr-contact-icon">
                  {c.icon === 'phone' && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  {c.icon === 'email' && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {c.icon === 'web' && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  )}
                </div>
                <div className="mmr-contact-body">
                  <span className="mmr-contact-lbl">{c.label}</span>
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="mmr-contact-val mmr-contact-link">
                      {c.value}
                    </a>
                  ) : (
                    <span className="mmr-contact-val">{c.value}</span>
                  )}
                  <span className="mmr-contact-sub">{c.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        /* Root */
        .mmr-root {
          animation: mmrIn 0.5s ease-out both;
        }
        @keyframes mmrIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Divider */
        .mmr-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .mmr-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.12);
        }
        .mmr-divider-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(52,211,153,0.6);
          box-shadow: 0 0 8px rgba(52,211,153,0.5);
        }

        /* Header */
        .mmr-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .mmr-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(167,243,208,0.8);
          margin-bottom: 12px;
        }
        .mmr-badge-icon { width: 12px; height: 12px; opacity: 0.8; }
        .mmr-title {
          font-size: clamp(1.5rem, 5vw, 2.25rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 10px;
        }
        .mmr-title-accent {
          color: #34d399;
        }
        .mmr-subtitle {
          font-size: 0.875rem;
          color: rgba(203,213,225,0.9);
          line-height: 1.65;
          max-width: 480px;
          margin: 0 auto;
        }


        .mmr-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }
        @media (max-width: 480px) {
          .mmr-features { grid-template-columns: 1fr; }
        }
        .mmr-feature {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .mmr-feature:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.16);
          transform: translateY(-1px);
        }
        .mmr-feature-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          border-radius: 12px 0 0 12px;
          opacity: 0.7;
        }
        .mmr-feature-icon {
          flex-shrink: 0;
          margin-top: 1px;
          opacity: 0.9;
        }
        .mmr-feature-title {
          font-size: 0.82rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .mmr-feature-desc {
          font-size: 0.75rem;
          color: rgba(203,213,225,0.9);
          line-height: 1.55;
        }

        /* Bottom grid */
        .mmr-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 600px) {
          .mmr-bottom { grid-template-columns: 1fr; }
        }

        /* Panels */
        .mmr-panel {
          border-radius: 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 18px;
          overflow: hidden;
        }
        .mmr-panel-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .mmr-panel-icon {
          width: 16px;
          height: 16px;
          color: #34d399;
          flex-shrink: 0;
        }
        .mmr-panel-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.01em;
        }

        /* Stations */
        .mmr-stations {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .mmr-station {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          transition: background 0.15s, border-color 0.15s;
        }
        .mmr-station:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(52,211,153,0.2);
        }
        .mmr-station-code {
          font-family: 'SF Mono','Fira Code',monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: #34d399;
          background: rgba(52,211,153,0.12);
          border: 1px solid rgba(52,211,153,0.2);
          padding: 3px 7px;
          border-radius: 5px;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        .mmr-station-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .mmr-station-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
        }
        .mmr-station-city {
          font-size: 0.7rem;
          color: rgba(186,200,214,0.85);
        }

        /* Contact */
        .mmr-contacts {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .mmr-contact {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          transition: background 0.15s;
        }
        .mmr-contact:hover {
          background: rgba(255,255,255,0.08);
        }
        .mmr-contact-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(52,211,153,0.1);
          border: 1px solid rgba(52,211,153,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #34d399;
          flex-shrink: 0;
        }
        .mmr-contact-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }
        .mmr-contact-lbl {
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(148,163,184,0.95);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .mmr-contact-val {
          font-size: 0.82rem;
          font-weight: 500;
          color: #ffffff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mmr-contact-link {
          color: #6ee7b7;
          text-decoration: none;
        }
        .mmr-contact-link:hover {
          text-decoration: underline;
          color: #a7f3d0;
        }
        .mmr-contact-sub {
          font-size: 0.68rem;
          color: rgba(148,163,184,0.85);
        }
      `}</style>
    </div>
  )
}