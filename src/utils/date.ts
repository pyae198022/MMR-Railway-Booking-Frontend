export function localDateISO(date?: Date, daysToAdd?: number): string {
  const targetDate = date ? new Date(date) : new Date()
  if (daysToAdd) {
    targetDate.setDate(targetDate.getDate() + daysToAdd)
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
