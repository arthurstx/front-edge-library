import React from 'react'

export interface BadgeProps extends React.ComponentProps<'div'> {
  variant?: 'none' | 'ghost'
  size?: 'xs' | 'sm'
  loading?: boolean
}
