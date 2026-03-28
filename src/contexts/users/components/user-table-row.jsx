import { Badge } from '../../../components/badge'
import Icon from '../../../components/icon'
import CopyIcon from '../../../assets/copy-simple.svg?react'
import { toast } from 'sonner'

export function UserTableRow({ user }) {
  const roleBadgeVariant = user.role === 'admin' ? 'success' : 'default'

  function copyId(id) {
    navigator.clipboard.writeText(id).then(() => {
      toast.success('ID de usuário copiado com sucesso!')
    })
  }

  return (
    <tr className="border-t bg-zinc-700 border-zinc-600 hover:bg-zinc-600 transition">
      <td className="py-4 px-4 text-sm text-white font-medium">{user.name}</td>
      <td className="py-4 px-4 text-sm text-white">{user.email}</td>
      <td className="py-4 px-4">
        <Badge variant={roleBadgeVariant}>{user.role}</Badge>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            className="border cursor-pointer rounded-lg border-transparent hover:border-white transition p-2"
            onClick={() => copyId(user.id)}
            aria-label="Copiar ID"
          >
            <Icon svg={CopyIcon} className="size-5 fill-white" />
          </button>
        </div>
      </td>
    </tr>
  )
}
