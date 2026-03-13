import * as React from 'react'

type TextVariant =
  | 'heading-large'
  | 'heading-medium'
  | 'heading-small'
  | 'paragraph-large'
  | 'paragraph-medium'
  | 'paragraph-small'
  | 'label-medium'
  | 'label-small'

export interface TextProps {
  as?: keyof React.JSX.IntrinsicElements
  variant?: TextVariant
  className?: string
  children?: React.ReactNode
}
