import { cva } from 'class-variance-authority'
import { cx } from 'class-variance-authority'

const iconVariants = cva('', {
  variants: {
    animate: {
      true: 'animate-spin',
      false: '',
    },
  },
  defaultVariants: {
    animate: false,
  },
})

/**
 * @param {{ svg: React.FC, animate?: boolean } & React.ComponentProps<"svg">} props
 */
export default function Icon({
  // eslint-disable-next-line no-unused-vars
  svg: SvgComponent,
  animate = false,
  className,
  ...props
}) {
  return (
    <SvgComponent
      className={cx(iconVariants({ animate }), className)}
      {...props}
    />
  )
}
