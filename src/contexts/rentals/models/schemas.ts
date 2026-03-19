import { z } from 'zod'

export const rentalFormSchema = z.object({
  userId: z.string().uuid('ID do usuário deve ser um UUID válido'),
  bookId: z.string().uuid('ID do livro deve ser um UUID válido'),
})
