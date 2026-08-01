// Utility functions to replace mockData dependencies

// Format price in Myanmar Kyat
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-MM', {
    style: 'currency',
    currency: 'MMK',
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Full Myanmar Railway Station Map ───────────────────────────────────────
// IDs match H2 auto-increment order from SimpleDataLoader.java (insertion order)
// Each entry: { id, code, name, nameMm, city, state }
const STATION_MAP: Record<string, {
  id: string; code: string; name: string; nameMm: string; city: string; state: string
}> = {
  // Insertion order matches SimpleDataLoader stations list (index 0 → ID 1, etc.)
  '1':  { id: '1',  code: 'YGN', name: 'Yangon Central',        nameMm: 'ရန်ကုန် ဗဟိုဘူတာ',       city: 'Yangon',       state: 'Yangon'       },
  '2':  { id: '2',  code: 'INS', name: 'Insein',                nameMm: 'အင်းစိန်',               city: 'Insein',       state: 'Yangon'       },
  '3':  { id: '3',  code: 'BGN', name: 'Bago',                  nameMm: 'ပဲခူး',                  city: 'Bago',         state: 'Bago'         },
  '4':  { id: '4',  code: 'PYA', name: 'Pyay',                  nameMm: 'ပြည်',                   city: 'Pyay',         state: 'Bago'         },
  '5':  { id: '5',  code: 'TGO', name: 'Taungoo',               nameMm: 'တောင်ငူ',                city: 'Taungoo',      state: 'Bago'         },
  '6':  { id: '6',  code: 'MDY', name: 'Mandalay',              nameMm: 'မန္တလေး',                 city: 'Mandalay',     state: 'Mandalay'     },
  '7':  { id: '7',  code: 'SAG', name: 'Sagaing',               nameMm: 'စစ်ကိုင်း',              city: 'Sagaing',      state: 'Sagaing'      },
  '8':  { id: '8',  code: 'MNY', name: 'Monywa',                nameMm: 'မုံရွာ',                  city: 'Monywa',       state: 'Sagaing'      },
  '9':  { id: '9',  code: 'NPT', name: 'Naypyitaw',             nameMm: 'နေပြည်တော်',             city: 'Naypyitaw',    state: 'Naypyitaw'    },
  '10': { id: '10', code: 'THT', name: 'Thazi',                 nameMm: 'သာစည်',                  city: 'Thazi',        state: 'Mandalay'     },
  '11': { id: '11', code: 'SHW', name: 'Shwenyaung',            nameMm: 'ရွှေညောင်',               city: 'Shwenyaung',   state: 'Shan State'   },
  '12': { id: '12', code: 'HTY', name: 'Htaukkyant',            nameMm: 'ထောက်ကြံ့',              city: 'Htaukkyant',   state: 'Yangon'       },
  '13': { id: '13', code: 'PHU', name: 'Pyin Oo Lwin',          nameMm: 'ပြင်ဦးလွင်',             city: 'Pyin Oo Lwin', state: 'Mandalay'     },
  '14': { id: '14', code: 'LSK', name: 'Lashio',                nameMm: 'လားရှိုး',                city: 'Lashio',       state: 'Shan State'   },
  '15': { id: '15', code: 'KYT', name: 'Kyaukse',               nameMm: 'ကျောက်ဆည်',              city: 'Kyaukse',      state: 'Mandalay'     },
  '16': { id: '16', code: 'KLA', name: 'Kalay',                 nameMm: 'ကလေး',                   city: 'Kalay',        state: 'Sagaing'      },
  '17': { id: '17', code: 'MYK', name: 'Myitkyina',             nameMm: 'မြစ်ကြီးနား',             city: 'Myitkyina',    state: 'Kachin State' },
  '18': { id: '18', code: 'HPA', name: 'Hpa-An',                nameMm: 'ဘားအံ',                  city: 'Hpa-An',       state: 'Kayin State'  },
  '19': { id: '19', code: 'MAW', name: 'Mawlamyine',            nameMm: 'မော်လမြိုင်',             city: 'Mawlamyine',   state: 'Mon State'    },
  '20': { id: '20', code: 'TNY', name: 'Taunggyi',              nameMm: 'တောင်ကြီး',               city: 'Taunggyi',     state: 'Shan State'   },

  // Code-based lookups (for backward compat / fallback)
  'ygn': { id: '1',  code: 'YGN', name: 'Yangon Central',       nameMm: 'ရန်ကုန် ဗဟိုဘူတာ',       city: 'Yangon',       state: 'Yangon'       },
  'ins': { id: '2',  code: 'INS', name: 'Insein',               nameMm: 'အင်းစိန်',               city: 'Insein',       state: 'Yangon'       },
  'bgn': { id: '3',  code: 'BGN', name: 'Bago',                 nameMm: 'ပဲခူး',                  city: 'Bago',         state: 'Bago'         },
  'bgo': { id: '3',  code: 'BGN', name: 'Bago',                 nameMm: 'ပဲခူး',                  city: 'Bago',         state: 'Bago'         },
  'pya': { id: '4',  code: 'PYA', name: 'Pyay',                 nameMm: 'ပြည်',                   city: 'Pyay',         state: 'Bago'         },
  'tgo': { id: '5',  code: 'TGO', name: 'Taungoo',              nameMm: 'တောင်ငူ',                city: 'Taungoo',      state: 'Bago'         },
  'mdy': { id: '6',  code: 'MDY', name: 'Mandalay',             nameMm: 'မန္တလေး',                 city: 'Mandalay',     state: 'Mandalay'     },
  'sag': { id: '7',  code: 'SAG', name: 'Sagaing',              nameMm: 'စစ်ကိုင်း',              city: 'Sagaing',      state: 'Sagaing'      },
  'mny': { id: '8',  code: 'MNY', name: 'Monywa',               nameMm: 'မုံရွာ',                  city: 'Monywa',       state: 'Sagaing'      },
  'npt': { id: '9',  code: 'NPT', name: 'Naypyitaw',            nameMm: 'နေပြည်တော်',             city: 'Naypyitaw',    state: 'Naypyitaw'    },
  'tht': { id: '10', code: 'THT', name: 'Thazi',                nameMm: 'သာစည်',                  city: 'Thazi',        state: 'Mandalay'     },
  'shw': { id: '11', code: 'SHW', name: 'Shwenyaung',           nameMm: 'ရွှေညောင်',               city: 'Shwenyaung',   state: 'Shan State'   },
  'hty': { id: '12', code: 'HTY', name: 'Htaukkyant',           nameMm: 'ထောက်ကြံ့',              city: 'Htaukkyant',   state: 'Yangon'       },
  'phu': { id: '13', code: 'PHU', name: 'Pyin Oo Lwin',         nameMm: 'ပြင်ဦးလွင်',             city: 'Pyin Oo Lwin', state: 'Mandalay'     },
  'lsk': { id: '14', code: 'LSK', name: 'Lashio',               nameMm: 'လားရှိုး',                city: 'Lashio',       state: 'Shan State'   },
  'kyt': { id: '15', code: 'KYT', name: 'Kyaukse',              nameMm: 'ကျောက်ဆည်',              city: 'Kyaukse',      state: 'Mandalay'     },
  'kla': { id: '16', code: 'KLA', name: 'Kalay',                nameMm: 'ကလေး',                   city: 'Kalay',        state: 'Sagaing'      },
  'myk': { id: '17', code: 'MYK', name: 'Myitkyina',            nameMm: 'မြစ်ကြီးနား',             city: 'Myitkyina',    state: 'Kachin State' },
  'hpa': { id: '18', code: 'HPA', name: 'Hpa-An',               nameMm: 'ဘားအံ',                  city: 'Hpa-An',       state: 'Kayin State'  },
  'maw': { id: '19', code: 'MAW', name: 'Mawlamyine',           nameMm: 'မော်လမြိုင်',             city: 'Mawlamyine',   state: 'Mon State'    },
  'tny': { id: '20', code: 'TNY', name: 'Taunggyi',             nameMm: 'တောင်ကြီး',               city: 'Taunggyi',     state: 'Shan State'   },
}

// ─── Route map: known station stops per train number ────────────────────────
// Mirrors routeStopConfigs in SimpleDataLoader.java
export const TRAIN_ROUTE_STOPS: Record<string, string[]> = {
  'TR-001': ['YGN', 'BGN', 'PYA', 'TGO', 'NPT', 'THT', 'MDY'],  // Yangon-Mandalay Express
  'TR-002': ['YGN', 'BGN', 'PYA', 'TGO', 'NPT'],                  // Yangon-Naypyitaw Special
  'TR-003': ['MDY', 'THT', 'NPT', 'TGO', 'PYA', 'BGN'],          // Mandalay-Bago Local
  'TR-004': ['YGN', 'BGN', 'KYT', 'MAW'],                          // Yangon-Mawlamyine Express
  'TR-005': ['MDY', 'SAG', 'MNY', 'KLA', 'MYK'],                  // Mandalay-Myitkyina Special
  'TR-006': ['NPT', 'THT', 'MDY'],                                  // Naypyitaw-Mandalay Express
  'TR-007': ['YGN', 'BGN', 'PYA', 'TGO', 'NPT', 'THT', 'MDY', 'KYT', 'PHU'], // Scenic
  'TR-008': ['BGN', 'PYA'],                                          // Bago-Pyay Local
}

// Get station by ID (numeric string) or code (lowercase string)
export function getStationById(id: string | number): {
  id: string; code: string; name: string; nameMm: string; city: string; state: string
} | undefined {
  const key = String(id).toLowerCase()
  return STATION_MAP[key]
}

// Get station name by ID
export function getStationNameById(id: string | number): string {
  const station = getStationById(id)
  return station?.name || `Station ${id}`
}

// Get station by code
export function getStationByCode(code: string): typeof STATION_MAP[string] | undefined {
  return STATION_MAP[code.toLowerCase()]
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-MM', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Format time for display
export function formatTime(timeString: string): string {
  const date = new Date(timeString)
  return date.toLocaleTimeString('en-MM', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Calculate duration between two times
export function calculateDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const diffMs = end.getTime() - start.getTime()

  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}