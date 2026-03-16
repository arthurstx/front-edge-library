import { z } from 'zod'

export const bookFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long.'),
  author: z.string().min(2, 'Author must be at least 2 characters long.'),
  category: z.string().min(2, 'Category must be at least 2 characters long.'),
})

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  category: z.string().optional(),
  total_copies: z.number(),
  created_at: z.string().optional(),
})
