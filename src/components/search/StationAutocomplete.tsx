import { useEffect, useId, useRef, useState } from 'react'
import { stations } from '../../data/mockData'
import type { Station } from '../../types'
import { MapPinIcon } from '../icons'

interface StationAutocompleteProps {
  label: string
  value: string
  onChange: (stationId: string) => void
  excludeId?: string
  placeholder?: string
}

function filterStations(query: string, excludeId?: string): Station[] {
  const q = query.trim().toLowerCase()
  return stations.filter((s) => {
    if (excludeId && s.id === excludeId) return false
    if (!q) return true
    return (
      s.name.toLowerCase().includes(q) ||
      s.nameMm.includes(q) ||
      s.id.toLowerCase().includes(q)
    )
  })
}

export function StationAutocomplete({
  label,
  value,
  onChange,
  excludeId,
  placeholder = 'Search station…',
}: StationAutocompleteProps) {
  const listId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = stations.find((s) => s.id === value)
  const [query, setQuery] = useState(selected?.name ?? '')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)

  const results = filterStations(query, excludeId)

  useEffect(() => {
    const station = stations.find((s) => s.id === value)
    if (station && !open) setQuery(station.name)
  }, [value, open])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        const station = stations.find((s) => s.id === value)
        setQuery(station?.name ?? '')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value])

  const pick = (station: Station) => {
    onChange(station.id)
    setQuery(station.name)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true)
      return
    }
    if (!open) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter' && results[highlight]) {
      e.preventDefault()
      pick(results[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <div className="relative">
        <MapPinIcon
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setHighlight(0)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 shadow-inner shadow-slate-900/[0.02] outline-none transition duration-200 hover:border-slate-300 hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15"
        />
      </div>

      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl shadow-slate-900/10"
        >
          {results.map((station, i) => (
            <li key={station.id} role="option" aria-selected={station.id === value}>
              <button
                type="button"
                onMouseEnter={() => setHighlight(i)}
                onClick={() => pick(station)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${
                  i === highlight || station.id === value
                    ? 'bg-emerald-50 text-emerald-900'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-medium">{station.name}</span>
                <span className="text-xs text-slate-400">{station.nameMm}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-lg">
          No stations found
        </div>
      )}
    </div>
  )
}
