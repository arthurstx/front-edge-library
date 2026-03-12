import { cva, cx } from "class-variance-authority";
import SpinnerIcon from "../../src/assets/spinner.svg?react";
import Icon from "./icon";

const buttonVariants = cva(
  "flex items-center justify-center gap-1 font-medium rounded-lg transition cursor-pointer group",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-zinc-800 hover:bg-zinc-700 text-white",
        destructive: "bg-red-600 hover:bg-red-700 text-white",
        ghost: "bg-blue-600 hover:bg-blue-700 text-white opacity-40 ",
      },
      size: {
        sm: "h-7 py-1 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg",
      },
      full: {
        true: "w-full",
      },
      disabled: {
        true: "opacity-70 pointer-events-none cursor-not-allowed",
      },
      handling: {
        true: "pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      full: false,
      disabled: false,
      handling: false,
    },
  },
);

const buttonIconVariants = cva("", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * @param {import("./types/button").ButtonProps} props
 */
export function Button({
  variant,
  size,
  full,
  disabled,
  handling,
  icon,
  className,
  children,
  type = "button",
  ...props
}) {
  const hasIcon = !!icon || handling;

  return (
    <button
      type={type}
      className={cx(
        buttonVariants({
          variant,
          size,
          full,
          disabled,
          handling,
        }),
        className,
      )}
      disabled={disabled || handling}
      aria-busy={handling}
      aria-disabled={disabled || handling}
      {...props}
    >
      {children}

      {hasIcon && (
        <Icon
          svg={handling ? SpinnerIcon : icon}
          animate={!!handling}
          className={buttonIconVariants({ size })}
        />
      )}
    </button>
  );
}
