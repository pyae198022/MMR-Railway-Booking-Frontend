import type { UserProfile } from '../types'

const STORAGE_KEY = 'mmr-user-profile'

export function loadUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UserProfile) : null
  } catch {
    return null
  }
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export function clearUserProfile(): void {
  localStorage.removeItem(STORAGE_KEY)
}
