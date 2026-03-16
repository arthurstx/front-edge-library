import { useState, useTransition, useEffect } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { useForm } from 'react-hook-form'

// ─── QuantityStepper ──────────────────────────────────────────────────────────

/**
 * @param {{
 *   value: number,
 *   disabled?: boolean,
 *   onDecrement: () => void,
 *   onIncrement: () => void,
 *   inputProps: React.ComponentProps<'input'>
 * }} props
 */
function QuantityStepper({
  value,
  disabled,
  onDecrement,
  onIncrement,
  inputProps,
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="text-sm font-medium text-zinc-700">Quantity</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= 1 || disabled}
          aria-label="Decrease quantity"
          className={cx(
            'flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200',
            'text-zinc-600 transition-colors hover:bg-zinc-100 active:bg-zinc-200',
            'disabled:cursor-not-allowed disabled:opacity-40',
            'focus-visible:outline-2 focus-visible:outline-zinc-900',
          )}
        >
          −
        </button>

        <input
          type="number"
          min={1}
          disabled={disabled}
          aria-label="Stock quantity"
          className={cx(
            'h-8 w-14 rounded-md border border-zinc-200 text-center',
            'text-sm font-medium text-zinc-900 tabular-nums',
            'focus:outline-2 focus:-outline-offset-1 focus:outline-zinc-900',
            'disabled:cursor-not-allowed disabled:opacity-40',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none',
            '[&::-webkit-outer-spin-button]:appearance-none',
          )}
          {...inputProps}
        />

        <button
          type="button"
          onClick={onIncrement}
          disabled={disabled}
          aria-label="Increase quantity"
          className={cx(
            'flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200',
            'text-zinc-600 transition-colors hover:bg-zinc-100 active:bg-zinc-200',
            'disabled:cursor-not-allowed disabled:opacity-40',
            'focus-visible:outline-2 focus-visible:outline-zinc-900',
          )}
        >
          +
        </button>
      </div>
    </div>
  )
}

// ─── AddStockActions ──────────────────────────────────────────────────────────

/**
 * @param {{ isPending: boolean }} props
 */
function AddStockActions({ isPending }) {
  return (
    <div className="flex justify-end gap-2">
      <Dialog.Close
        disabled={isPending}
        className={cx(
          'flex h-9 items-center justify-center rounded-md border border-zinc-200',
          'px-4 text-sm font-medium text-zinc-700 select-none transition-colors',
          'hover:bg-zinc-100 active:bg-zinc-200',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-zinc-900',
        )}
      >
        Cancel
      </Dialog.Close>

      <button
        type="submit"
        disabled={isPending}
        className={cx(
          'flex h-9 items-center justify-center rounded-md bg-zinc-900',
          'px-4 text-sm font-medium text-white select-none transition-colors',
          'hover:bg-zinc-700 active:bg-zinc-800',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-zinc-900',
        )}
      >
        {isPending ? 'Saving...' : 'Confirm'}
      </button>
    </div>
  )
}

// ─── AddStockDialog ───────────────────────────────────────────────────────────

/**
 * @param {{ onConfirm: (data: { quantity: number }) => Promise<void> }} props
 */
export function AddStockDialog({ onConfirm }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: { quantity: 1 },
  })

  const quantity = watch('quantity')

  function handleDecrement() {
    setValue('quantity', Math.max(1, quantity - 1))
  }

  function handleIncrement() {
    setValue('quantity', quantity + 1)
  }

  /** @param {{ quantity: number }} data */
  function onSubmit(data) {
    startTransition(async () => {
      setOpen(false)
      await onConfirm({ quantity: data.quantity })
    })
  }

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={cx(
          'flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md',
          'bg-zinc-900 px-4 text-sm font-medium text-white select-none',
          'hover:bg-zinc-700 active:bg-zinc-800 transition-colors',
          'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-zinc-900',
        )}
      >
        + Add Stock
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cx(
            'fixed inset-0 min-h-dvh bg-black/40 transition-opacity duration-150',
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            'supports-[-webkit-touch-callout:none]:absolute',
          )}
        />
        <Dialog.Popup
          className={cx(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-80 max-w-[calc(100vw-2rem)] rounded-xl bg-white p-6',
            'shadow-lg outline outline-zinc-200',
            'transition-all duration-150',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          )}
        >
          <Dialog.Title className="mb-1 text-base font-semibold text-zinc-900">
            Add Stock
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-sm text-zinc-500">
            Select the quantity of books to add to stock.
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            <QuantityStepper
              value={quantity}
              disabled={isPending}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              inputProps={register('quantity', { valueAsNumber: true, min: 1 })}
            />

            <AddStockActions isPending={isPending} />
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
