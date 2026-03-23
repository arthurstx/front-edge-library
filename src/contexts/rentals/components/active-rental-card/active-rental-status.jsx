import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { Text } from '../../../../components/text'
import { Badge } from '../../../../components/badge'

/**
 * @param {{ endDate: string, className?: string } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalStatus({ endDate, className, ...props }) {
  const getStatusInfo = (dateStr) => {
    if (!dateStr) return { variant: 'success', label: 'No prazo' }

    const diffTime = new Date(dateStr).getTime() - new Date().getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return {
        variant: 'danger',
        label: `Atrasado ${Math.abs(diffDays)} dia(s)`,
      }
    }
    if (diffDays <= 3) {
      return { variant: 'warning', label: `Vence em ${diffDays} dia(s)` }
    }
    return { variant: 'success', label: `Vence em ${diffDays} dia(s)` }
  }

  const { variant, label } = getStatusInfo(endDate)

  return (
    <div className={twMerge('flex flex-col gap-0.5', className)} {...props}>
      <Text
        variant="label-xsmall"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        Status
      </Text>
      <Badge variant={variant}>{label}</Badge>
    </div>
  )
}
