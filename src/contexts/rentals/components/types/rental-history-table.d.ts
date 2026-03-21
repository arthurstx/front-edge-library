import * as React from 'react'

export type HistoryStatus = 'returned' | 'overdue'

export interface RentalHistoryItem {
  id: string
  title: string
  author: string
  returnDate: string
  status: HistoryStatus
}

export interface RentalHistoryTableProps extends React.ComponentProps<'div'> {
  items: RentalHistoryItem[]
  loading?: boolean
}
