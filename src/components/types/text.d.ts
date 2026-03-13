import { VariantProps } from 'class-variance-authority'
import { textVariants } from '../text'
import * as React from 'react'

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  children?: React.ReactNode
}
