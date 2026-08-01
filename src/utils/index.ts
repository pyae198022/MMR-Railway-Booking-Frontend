// Utility functions to replace mockData dependencies

// Format price in Myanmar Kyat
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-MM', {
    style: 'currency',
    currency: 'MMK',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Get station name by ID - simplified version
export function getStationNameById(id: string | number): string {
  const station = getStationById(id)
  return station?.name || `Station ${id}`
}

// Get station details by ID - simplified version for migration
// In production, this should fetch from backend API
export function getStationById(id: string | number): any {
  // Simple mapping for common station IDs
  const stationMap: Record<string, any> = {
    '1': { id: '1', name: 'Yangon', nameMm: 'ရန်ကုန်', code: 'YGN' },
    '6': { id: '6', name: 'Mandalay', nameMm: 'မန္တလေး', code: 'MDY' },
    '9': { id: '9', name: 'Naypyidaw', nameMm: 'နေပြည်တော်', code: 'NPT' },
    '3': { id: '3', name: 'Bago', nameMm: 'ပဲခူး', code: 'BGN' },
    'ygn': { id: 'ygn', name: 'Yangon', nameMm: 'ရန်ကုန်' },
    'mdy': { id: 'mdy', name: 'Mandalay', nameMm: 'မန္တလေး' },
    'npt': { id: 'npt', name: 'Naypyidaw', nameMm: 'နေပြည်တော်' },
    'bgo': { id: 'bgo', name: 'Bago', nameMm: 'ပဲခူး' },
  }
  
  const key = String(id).toLowerCase()
  return stationMap[key] || { id: String(id), name: `Station ${id}` }
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