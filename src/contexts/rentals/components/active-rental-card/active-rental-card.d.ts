export type RentalStatus = 'rented' | 'returned'

export interface Rental {
  id: string
  userId: string
  bookId: string
  status: RentalStatus
  start_date?: string // ISO timestamp
  end_date?: string // ISO timestamp
}
