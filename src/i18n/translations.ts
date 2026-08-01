// ─── Translation dictionary ──────────────────────────────────────────────────
// mm = Myanmar (Burmese), en = English
// Add every user-facing string here.

export type Lang = 'mm' | 'en'

const dict = {
  // ── Header ─────────────────────────────────────────────────────────────────
  header_tagline:         { mm: 'အွန်လိုင်းလက်မှတ်ဝယ်ယူခြင်း', en: 'Online Ticket Booking' },
  header_signup:          { mm: 'အကောင့်ဖွင့်ရန်',              en: 'Sign up' },
  header_lang_mm:         { mm: 'မြန်မာ',                        en: 'MM' },
  header_lang_en:         { mm: 'EN',                            en: 'EN' },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer_copy:            { mm: '© ၂၀၂၆ မြန်မာ့မီးရထား',         en: '© 2026 Myanma Railways' },

  // ── Step Indicator ─────────────────────────────────────────────────────────
  step_trains:            { mm: 'ရထားများ',                      en: 'Trains' },
  step_seats:             { mm: 'ထိုင်ခုံ',                      en: 'Seats' },
  step_verify:            { mm: 'အတည်ပြုရန်',                    en: 'Verify' },
  step_details:           { mm: 'အချက်အလက်',                     en: 'Details' },
  step_payment:           { mm: 'ငွေပေးချေရန်',                  en: 'Payment' },

  // ── Search Form ─────────────────────────────────────────────────────────────
  search_title:           { mm: 'သင်သွားလိုသောနေရာ?',            en: 'Where would you like to go?' },
  search_subtitle:        { mm: 'လမ်းကြောင်းများ နှိုင်းယှဉ်ရန်...', en: 'Compare routes...' },
  search_oneway:          { mm: 'တစ်ကြောင်းသွား',               en: 'One way' },
  search_roundtrip:       { mm: 'အသွားအပြန်',                    en: 'Round trip' },
  search_from:            { mm: 'ထွက်ခွာမည့်ဘူတာ',               en: 'From' },
  search_to:              { mm: 'ရောက်မည့်ဘူတာ',                 en: 'To' },
  search_departure:       { mm: 'ထွက်ခွာသည့်ရက်',               en: 'Departure' },
  search_return:          { mm: 'ပြန်လာသည့်ရက်',                 en: 'Return date' },
  search_passengers:      { mm: 'ခရီးသည်အရေအတွက်',              en: 'Passengers' },
  search_btn:             { mm: 'ရထားရှာဖွေရန်',                 en: 'Search trains' },
  search_have_ticket:     { mm: 'လက်မှတ်ရှိပြီးပါသလား?',         en: 'Already have a ticket?' },
  search_ref_placeholder: { mm: 'ကိုးကားနံပါတ်ထည့်ပါ...',        en: 'Enter booking reference...' },
  search_find_ticket:     { mm: 'လက်မှတ်ရှာရန်',                 en: 'Find ticket' },
  search_footer:          { mm: 'လက်မှတ်ဝယ်ယူခြင်း · အချိန်ဇယားနှင့် ငွေပေးချေမှု', en: 'Ticket booking · schedules and payments' },

  // ── Train Results ───────────────────────────────────────────────────────────
  results_edit_search:    { mm: 'ရှာဖွေမှုပြင်ဆင်ရန်',           en: 'Edit search' },
  results_results:        { mm: 'ရလဒ်',                           en: 'result' },
  results_no_trains:      { mm: 'ဤလမ်းကြောင်းတွင် ရထားမရှိပါ', en: 'No trains on this route' },
  results_try_other:      { mm: 'အခြားဘူတာတစ်ခု ကြိုးစားပါ',    en: 'Try different stations' },
  results_new_search:     { mm: 'ရှာဖွေမှုအသစ်',                 en: 'New search' },
  results_from_price:     { mm: 'ခရီးသည်တစ်ဦးစာ',               en: 'Per passenger from' },
  results_select_class:   { mm: 'ထိုင်ခုံအမျိုးအစားရွေးချယ်ရန်',              en: 'Select class' },
  results_hide_classes:   { mm: 'ပိတ်ရန်',                       en: 'Hide classes' },
  results_choose_seats:   { mm: 'ထိုင်ခုံရွေးချယ်ရန် →',         en: 'Choose seats →' },
  results_book_now:       { mm: 'ရွေးချယ်',                  en: 'Book now' },
  results_per_pax:        { mm: 'ခရီးသည်တစ်ဦးစာ',               en: 'per passenger' },
  results_seats_left:     { mm: 'ခုံကျန်သည်',                    en: 'seats left' },
  results_stops:          { mm: 'ရပ်နားမည့် ဘူတာ',                           en: 'stop' },
  results_stops_plural:   { mm: 'ရပ်နားမည့် ဘူတာများ',                           en: 'stops' },
  results_round_trip:     { mm: 'အသွားအပြန်',                    en: 'Round trip' },
  results_passengers:     { mm: 'ခရီးသည်',                       en: 'passenger' },

  // ── Seat Grid ───────────────────────────────────────────────────────────────
  seats_title:            { mm: 'ထိုင်ခုံရွေးချယ်ပါ',            en: 'Select your seats' },
  seats_back:             { mm: 'ရထားများဆီသို့',                 en: 'Back to trains' },
  seats_map:              { mm: 'ထိုင်ခုံမြေပုံ',                 en: 'Seat map' },
  seats_available:        { mm: 'ရနိုင်သောနေရာ',                  en: 'Available' },
  seats_selected:         { mm: 'ရွေးချယ်ပြီး',                   en: 'Selected' },
  seats_occupied:         { mm: 'မရနိုင်',                        en: 'Occupied' },
  seats_tap_to_select:    { mm: 'နှိပ်၍ ရွေးချယ်ပါ',             en: 'Tap to select' },
  seats_your_pick:        { mm: 'ရွေးချယ်ပြီး',               en: 'Your pick' },
  seats_unavailable:      { mm: 'မရနိုင်ပါ',                      en: 'Unavailable' },
  seats_front:            { mm: '↑ ရထားရှေ့ဖက်',                 en: '↑ Front of train' },
  seats_exit:             { mm: 'ဝင်/ထွက်ပေါက် ↓',               en: 'Entrance / Exit ↓' },
  seats_window_note:      { mm: 'A နှင့် B သည် ပြတင်းပေါက်ဖက် · C နှင့် D သည် လျှောက်လမ်းဖက်', en: 'Seats A & B are by the window · C & D are aisle-side' },
  seats_selected_label:   { mm: 'ရွေးချယ်ထားသောထိုင်ခုံ',         en: 'Selected seats' },
  seats_none:             { mm: 'မရွေးရသေးပါ',                   en: 'None yet' },
  seats_proceed:          { mm: 'ဆက်လက်သွားရန်',                 en: 'Proceed to details' },
  seats_window:           { mm: 'ပြတင်းပေါက်ဖက်',                       en: 'Window' },
  seats_aisle:            { mm: 'လျှောက်လမ်းဖက်',                       en: 'Aisle' },

  // ── Verification Form ──────────────────────────────────────────────────────
  verify_title:           { mm: 'မှတ်ပုံတင်စစ်ဆေးရန်',           en: 'Identity verification' },
  verify_desc:            { mm: 'မြန်မာနိုင်ငံသားစိစစ်ရေးကတ်ဖြင့် ဆက်လက်ဝယ်ယူပါ', en: 'Verify your Myanmar NRC to continue booking' },
  verify_back:            { mm: 'ထိုင်ခုံဆီသို့',                 en: 'Back to seats' },
  verify_heading:         { mm: 'ပင်မခရီးသည် စစ်ဆေးခြင်း',       en: 'Primary passenger verification' },
  verify_note:            { mm: 'မြန်မာ့မီးရထား အွန်လိုင်းဝယ်ယူမှုအားလုံးအတွက် လိုအပ်သည်', en: 'Required for all Myanma Railways online bookings' },
  verify_fullname:        { mm: 'အမည် (မှတ်ပုံတင်ပါ အမည်)',       en: 'Full name (as on NRC)' },
  verify_nrc:             { mm: 'မှတ်ပုံတင်နံပါတ်',               en: 'NRC number' },
  verify_nrc_format:      { mm: 'ပုံစံ: မြို့နယ်ကုဒ် + ဂဏန်း ၆ လုံး', en: 'Format: township code / name (parent) + 6 digits' },
  verify_btn:             { mm: 'မှတ်ပုံတင်စစ်ဆေးရန်',           en: 'Verify NRC' },
  verify_success:         { mm: 'မှတ်ပုံတင် အတည်ပြုပြီးပါပြီ',   en: 'NRC verified successfully' },
  verify_edit:            { mm: 'ပြင်ဆင်ရန်',                     en: 'Edit details' },
  verify_continue:        { mm: 'ခရီးသည်အချက်အလက်သို့ ဆက်သွားရန်', en: 'Continue to passenger details' },
  verify_error_name:      { mm: 'အမည်ထည့်ရန် လိုအပ်သည်',         en: 'Full name is required.' },
  verify_error_nrc:       { mm: 'မှတ်ပုံတင်ပုံစံ မှားနေသည်',      en: 'Invalid NRC format.' },

  // ── Passenger Form ─────────────────────────────────────────────────────────
  pax_title:              { mm: 'ခရီးသည်အချက်အလက်',              en: 'Passenger details' },
  pax_back:               { mm: 'နောက်သို့',                      en: 'Back' },
  pax_label:              { mm: 'ခရီးသည်',                       en: 'Passenger' },
  pax_seat:               { mm: 'ထိုင်ခုံ',                      en: 'Seat' },
  pax_fullname:           { mm: 'အမည် (နာမည်အပြည့်)',             en: 'Full name' },
  pax_nrc:                { mm: 'မှတ်ပုံတင်နံပါတ်',               en: 'NRC' },
  pax_profile_note:       { mm: 'ပင်မခရီးသည်အချက်အလက်ကို သင်၏ profile မှ ယူထားသည်', en: 'Primary passenger details are taken from your signed-in profile.' },
  pax_continue:           { mm: 'ငွေပေးချေရန် ဆက်သွားမည်',       en: 'Continue to payment' },
  pax_name_required:      { mm: 'အမည်ထည့်ရန် လိုအပ်သည်',         en: 'Name is required' },
  pax_traveler:           { mm: 'ခရီးသည်',                       en: 'traveler' },
  pax_travelers:          { mm: 'ခရီးသည်များ',                    en: 'travelers' },

  // ── Payment ─────────────────────────────────────────────────────────────────
  pay_title:              { mm: 'ငွေချေပေးရန်',                   en: 'Checkout' },
  pay_desc:               { mm: 'မြန်မာငွေပေးချေမှုဖြင့် ဝယ်ယူမှုအတည်ပြုပါ', en: 'Pay via a local gateway to confirm your booking' },
  pay_back:               { mm: 'အချက်အလက်သို့ ပြန်သွားမည်',     en: 'Back to details' },
  pay_scan:               { mm: 'ပေးချေရန် QR Scan လုပ်ပါ',       en: 'Scan to pay with' },
  pay_amount:             { mm: 'ငွေပမာဏ',                        en: 'Amount' },
  pay_open_app:           { mm: 'App ဖွင့်ပြီး QR Scan လုပ်ပါ',   en: 'Open your app and scan this code' },
  pay_verify:             { mm: 'ငွေပေးချေမှု စစ်ဆေးရန်',         en: 'Verify payment' },
  pay_verifying:          { mm: 'စစ်ဆေးနေဆဲ...',                  en: 'Verifying payment…' },
  pay_expired_back:       { mm: 'ထိုင်ခုံရွေးချယ်မှုသို့ ပြန်သွားမည်', en: 'Return to seat selection' },
  pay_mock_qr:            { mm: 'စမ်းသပ် QR',                     en: 'Mock QR' },

  // ── Order Summary ───────────────────────────────────────────────────────────
  summary_title:          { mm: 'အကျဉ်းချုပ်',                    en: 'Summary' },
  summary_route:          { mm: 'လမ်းကြောင်း',                    en: 'Route' },
  summary_train:          { mm: 'ရထား',                           en: 'Train' },
  summary_seats:          { mm: 'ထိုင်ခုံ',                      en: 'Seats' },
  summary_passengers:     { mm: 'ခရီးသည်',                       en: 'Passengers' },
  summary_total:          { mm: 'စုစုပေါင်း',                     en: 'Total' },

  // ── Confirmation ────────────────────────────────────────────────────────────
  confirm_title:          { mm: 'ဝယ်ယူမှုအတည်ပြုပြီး',           en: 'Booking confirmed' },
  confirm_ref:            { mm: 'ကိုးကားနံပါတ်',                  en: 'Reference' },
  confirm_eticket:        { mm: 'အီလက်ထရောနစ် လက်မှတ်',          en: 'E-ticket' },
  confirm_train:          { mm: 'ရထား',                           en: 'Train' },
  confirm_departure:      { mm: 'ထွက်ချိန်',                      en: 'Departure' },
  confirm_arrival:        { mm: 'ရောက်ချိန်',                     en: 'Arrival' },
  confirm_class:          { mm: 'အတန်း',                          en: 'Class' },
  confirm_seats:          { mm: 'ထိုင်ခုံများ',                   en: 'Seats' },
  confirm_total:          { mm: 'ငွေပေးပြီး စုစုပေါင်း',           en: 'Total paid' },
  confirm_passengers:     { mm: 'ခရီးသည်များ',                    en: 'Passengers' },
  confirm_print:          { mm: 'ပရင့်ထုတ်ရန်',                  en: 'Print ticket' },
  confirm_book_again:     { mm: 'ထပ်မံဝယ်ယူရန်',                 en: 'Book again' },

  // ── Registration / Profile ─────────────────────────────────────────────────
  reg_title_new:          { mm: 'အကောင့်ဖန်တီးရန်',               en: 'Create your account' },
  reg_title_edit:         { mm: 'Profile ပြင်ဆင်ရန်',             en: 'Edit profile' },
  reg_desc:               { mm: 'ဤဘရောင်ဇာတွင် အချက်အလက်သိမ်းဆည်းပြီး လက်မှတ်ကြည့်နိုင်သည်', en: 'Save your details and access tickets from this browser.' },
  reg_back_booking:       { mm: 'ဝယ်ယူမှုသို့ ပြန်သွားမည်',       en: 'Back to booking' },
  reg_fullname:           { mm: 'အမည် (နာမည်အပြည့်)',             en: 'Full name' },
  reg_phone:              { mm: 'ဖုန်းနံပါတ်',                    en: 'Phone number' },
  reg_nrc:                { mm: 'မှတ်ပုံတင် (မဖြစ်မနေ မဟုတ်)',    en: 'NRC (optional)' },
  reg_demo_note:          { mm: 'ဒီမိုအကောင့်: ဘရောင်ဇာတွင်သာ သိမ်းဆည်းသည်', en: 'Demo account: details stored in this browser only.' },
  reg_save:               { mm: 'Profile သိမ်းဆည်းရန်',            en: 'Save profile' },
  reg_create:             { mm: 'အကောင့်ဖန်တီးရန်',               en: 'Create account' },

  profile_title:          { mm: 'ကျွန်ုပ်၏ Profile',               en: 'My profile' },
  profile_desc:           { mm: 'သင်၏ ဘရောင်ဇာတွင် သိမ်းဆည်းထားသော အကောင့်နှင့် လက်မှတ်မှတ်တမ်း', en: 'Your locally saved account and ticket history.' },
  profile_book_ticket:    { mm: 'လက်မှတ်ဝယ်ယူရန်',               en: 'Book a ticket' },
  profile_edit:           { mm: 'Profile ပြင်ဆင်ရန်',              en: 'Edit profile' },
  profile_name:           { mm: 'အမည်',                           en: 'Name' },
  profile_phone:          { mm: 'ဖုန်းနံပါတ်',                    en: 'Phone' },
  profile_nrc:            { mm: 'မှတ်ပုံတင်',                     en: 'NRC' },
  profile_not_added:      { mm: 'မထည့်ရသေး',                     en: 'Not added' },
  profile_saved_tickets:  { mm: 'သိမ်းဆည်းထားသော လက်မှတ်များ',    en: 'Saved tickets' },
  profile_tickets_note:   { mm: 'ဤဘရောင်ဇာတွင် ဝယ်ယူထားသော လက်မှတ်များ ဤနေရာတွင် ပြသသည်', en: 'Tickets booked in this browser are shown here.' },
  profile_ticket:         { mm: 'လက်မှတ်',                       en: 'ticket' },
  profile_tickets:        { mm: 'လက်မှတ်များ',                   en: 'tickets' },
  profile_no_tickets:     { mm: 'လက်မှတ်မရှိသေး',               en: 'No saved tickets yet' },
  profile_start_booking:  { mm: 'ဝယ်ယူမှုစတင်ရန်',               en: 'Start booking' },
  profile_to:             { mm: 'မှ',                             en: 'to' },
  profile_view_ticket:    { mm: 'လက်မှတ်ကြည့်ရန်',               en: 'View ticket' },
  profile_signout:        { mm: 'ဘရောင်ဇာမှ ထွက်ရန်',             en: 'Sign out of this browser' },
} as const

export type TranslationKey = keyof typeof dict

export function t(key: TranslationKey, lang: Lang): string {
  return dict[key][lang]
}
