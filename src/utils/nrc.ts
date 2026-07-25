/** Myanmar NRC format e.g. 12/MaGaTa(Naing)123456 */
const NRC_PATTERN = /^\d{1,2}\/[A-Za-z]+\([A-Za-z]+\)\d{6}$/

export function validateNrc(nrc: string): boolean {
  return NRC_PATTERN.test(nrc.trim())
}

export function formatNrcHint(): string {
  return '12/MaGaTa(Naing)123456'
}

export function normalizeNrc(nrc: string): string {
  return nrc.trim()
}
