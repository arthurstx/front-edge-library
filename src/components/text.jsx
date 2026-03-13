import React from 'react'
import { cva, cx } from 'class-variance-authority'

const textVariants = cva('font-sans text-white', {
  variants: {
    variant: {
      'heading-large': 'text-2xl leading-[130%] font-bold',
      'heading-medium': 'text-xl leading-[130%] font-bold',
      'heading-small': 'text-base leading-[130%] font-bold',

      'paragraph-large': 'text-base leading-[150%] font-medium',
      'paragraph-medium': 'text-sm leading-[150%] font-medium',
      'paragraph-small': 'text-xs leading-[150%] font-medium',

      'label-medium': 'text-base leading-[150%] font-semibold',
      'label-small': 'text-xs leading-[150%] font-semibold',
    },
  },
  defaultVariants: {
    variant: 'paragraph-medium',
  },
})

/**
 * @param {import("./types/text").TextProps} props
 */
export function Text({
  // eslint-disable-next-line no-unused-vars
  as: Component = 'span',
  variant,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cx(
        textVariants({
          variant,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
