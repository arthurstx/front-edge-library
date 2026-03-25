import { createContext, useContext } from 'react'

export const SheetContext = createContext(null)

export function useSheet() {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error('Sheet components must be wrapped in <Sheet />')
  }
  return context
}
