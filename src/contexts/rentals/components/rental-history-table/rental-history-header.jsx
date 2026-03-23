import { Text } from '../../../../components/text'

export function RentalHistoryHeader() {
  return (
    <div className="grid grid-cols-[1fr_160px_140px] px-4 py-5 border-b border-white/10">
      <Text
        variant="label-small"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        Livro
      </Text>
      <Text
        variant="label-small"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        Devolução
      </Text>
      <Text
        variant="label-small"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        Status
      </Text>
    </div>
  )
}
