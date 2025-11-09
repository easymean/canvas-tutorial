import { EditCanvas } from '@/features/edit-canvas'
import { MiniMap } from '@/features/mini-map'

export default function Canvas() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MiniMap />
      <EditCanvas />
    </div>
  )
}
