import { useState, useTransition, useEffect } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cx } from 'class-variance-authority'
import { useForm } from 'react-hook-form'
import { InputField } from '../../auth/components/input-field'
import { Text } from '../../../components/text'
import Pencil from '../../../assets/pencil-line.svg?react'
import Icon from '../../../components/icon'

// ─── SelectField ──────────────────────────────────────────────────────────────

/**
 * @param {{
 *   label?: string,
 *   error?: string,
 *   disabled?: boolean,
 *   className?: string
 * } & React.ComponentProps<'select'>} props
 */
function SelectField({
  label,
  error,
  disabled,
  className,
  children,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Text as="label" variant="paragraph-small" className="text-zinc-400">
          {label}
        </Text>
      )}
      <select
        disabled={disabled}
        className={cx(
          'w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none transition',
          'focus:ring-2 focus:ring-blue-500',
          "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_12px_center]",
          error && 'ring-2 ring-red-500 focus:ring-red-500',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <Text variant="paragraph-small" className="text-red-400">
          {error}
        </Text>
      )}
    </div>
  )
}

// ─── EditBookActions ──────────────────────────────────────────────────────────

/**
 * @param {{ isPending: boolean }} props
 */
function EditBookActions({ isPending }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <Dialog.Close
        disabled={isPending}
        className={cx(
          'flex h-9 items-center justify-center rounded-md border border-zinc-600',
          'px-4 text-sm font-medium text-zinc-300 select-none transition-colors',
          'hover:bg-zinc-700 active:bg-zinc-600',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-500',
        )}
      >
        Cancel
      </Dialog.Close>

      <button
        type="submit"
        disabled={isPending}
        className={cx(
          'flex h-9 items-center justify-center rounded-md bg-blue-600',
          'px-4 text-sm font-medium text-white select-none transition-colors',
          'hover:bg-blue-500 active:bg-blue-700',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-500',
        )}
      >
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

// ─── EditBookDialog ───────────────────────────────────────────────────────────

const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'History',
  'Biography',
  'Fantasy',
  'Mystery',
  'Romance',
  'Technology',
  'Philosophy',
]

/**
 * @typedef {{ title: string, author: string, category: string }} BookData
 *
 * @param {{
 *   book: BookData,
 *   onConfirm: (data: BookData) => Promise<void>
 * }} props
 */
export function EditBookDialog({ book, onConfirm }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: book })

  /** @param {BookData} data */
  function onSubmit(data) {
    console.log(data)
    startTransition(async () => {
      await onConfirm(data)
      setOpen(false)
    })
  }

  useEffect(() => {
    if (open) reset(book)
  }, [open, book, reset])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={cx(
          'flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md',
          'border border-transparent flex hover:border-zinc-200 px-4 select-none',
          'focus-visible:outline focus-visible:-outline-offset-1 ',
        )}
      >
        <Icon svg={Pencil} className="size-5 fill-white" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cx(
            'fixed inset-0 min-h-dvh bg-black/60 transition-opacity duration-150',
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            'supports-[-webkit-touch-callout:none]:absolute',
          )}
        />
        <Dialog.Popup
          className={cx(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-96 max-w-[calc(100vw-2rem)] rounded-xl bg-zinc-800 p-6',
            'shadow-xl outline outline-zinc-700',
            'transition-all duration-150',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          )}
        >
          <Dialog.Title className="mb-1 text-base font-semibold text-white">
            Edit Book
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-sm text-zinc-400">
            Update the book details below.
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 mb-6">
              <InputField
                label="Title"
                placeholder="e.g. The Great Gatsby"
                disabled={isPending}
                error={errors.title?.message}
                {...register('title', { required: 'Title is required' })}
              />

              <InputField
                label="Author"
                placeholder="e.g. F. Scott Fitzgerald"
                disabled={isPending}
                error={errors.author?.message}
                {...register('author', { required: 'Author is required' })}
              />

              <SelectField
                label="Category"
                disabled={isPending}
                error={errors.category?.message}
                {...register('category', { required: 'Category is required' })}
              >
                <option value="" className="bg-zinc-800">
                  Select a category
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-zinc-800">
                    {cat}
                  </option>
                ))}
              </SelectField>
            </div>

            <EditBookActions isPending={isPending} />
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
