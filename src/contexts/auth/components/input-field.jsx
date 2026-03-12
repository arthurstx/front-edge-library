import { cva, cx } from "class-variance-authority";

/**
 * @typedef {"md"} InputSize
 * @typedef {{ error?: boolean, disabled?: boolean, size?: InputSize }} InputVariantProps
 */
const inputVariants = cva(
  "w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-500",
  {
    variants: {
      error: { true: "ring-2 ring-red-500 focus:ring-red-500" },
      disabled: { true: "opacity-50 pointer-events-none" },
    },
    defaultVariants: { error: false, disabled: false },
  },
);

export function InputField({ label, error, disabled, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-zinc-400">{label}</label>}
      <input
        className={cx(inputVariants({ error: !!error, disabled }), className)}
        disabled={disabled}
        {...props}
      />
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}
