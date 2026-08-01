export function localDateISO(dateOrOffset?: Date | number, daysToAdd?: number): string {
  let targetDate: Date
  if (typeof dateOrOffset === 'number') {
    // Called as localDateISO(n) — add n days to today
    targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + dateOrOffset)
  } else {
    targetDate = dateOrOffset ? new Date(dateOrOffset) : new Date()
    if (daysToAdd) {
      targetDate.setDate(targetDate.getDate() + daysToAdd)
    }
  }
  const year = targetDate.getFullYear()
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const day = String(targetDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}
