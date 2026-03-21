import * as React from 'react'

export type RentalStatus = 'due_soon' | 'on_time' | 'overdue'

export interface ActiveRentalCardProps extends React.ComponentProps<'div'> {
  title: string
  author: string
  genre: string
  coverUrl?: string
  withdrawalDate: string
  returnDate: string
  status: RentalStatus
  statusLabel: string
  loading?: boolean
}
