import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="ui-label">{children}</label>
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="ui-input" {...props} />
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="ui-input" {...props} />
}
