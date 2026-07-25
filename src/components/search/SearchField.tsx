import type { ReactNode, SelectHTMLAttributes } from 'react'

interface SearchFieldProps {
  label: string
  icon: ReactNode
  children: ReactNode
}

export function SearchField({ label, icon, children }: SearchFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}

const fieldClass =
  'w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/80 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 shadow-inner shadow-slate-900/[0.02] outline-none transition duration-200 hover:border-slate-300 hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15'

export function SearchSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={fieldClass} {...props} />
}

export function SearchDateInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input className={fieldClass} {...props} />
}
