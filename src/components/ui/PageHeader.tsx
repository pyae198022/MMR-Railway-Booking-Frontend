import type { ReactNode } from 'react'
import { ArrowLeftIcon } from '../icons'

interface PageHeaderProps {
  title: string
  description?: string
  backLabel?: string
  onBack?: () => void
  action?: ReactNode
}

export function PageHeader({
  title,
  description,
  backLabel,
  onBack,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        {onBack && backLabel && (
          <button type="button" onClick={onBack} className="ui-btn-ghost mb-2 -ml-1">
            <ArrowLeftIcon size={16} />
            {backLabel}
          </button>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
