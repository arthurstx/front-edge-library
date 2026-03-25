import * as React from 'react'

/**
 * @param {{ id: string, name: string, className?: string } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalUser({ id, name, className, ...props }) {
  return (
    <div className={`flex flex-col gap-0.5 ${className || ''}`} {...props}>
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
        DADOS DO USUÁRIO
      </span>
      <div className="flex flex-col mt-1">
        <span className="text-sm font-semibold text-zinc-100">{name}</span>
        <span className="text-xs text-zinc-500 font-mono">ID: {id}</span>
      </div>
    </div>
  )
}
