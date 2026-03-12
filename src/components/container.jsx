import React from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const containerVariants = cva("", {
  variants: {
    size: {
      md: "max-w-7xl mx-auto px-3 w-full",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export function Container({ as, children, className, size, ...props }) {
  const Component = as || "div";

  return (
    <Component
      className={twMerge(clsx(containerVariants({ size }), className))}
      {...props}
    >
      {children}
    </Component>
  );
}
