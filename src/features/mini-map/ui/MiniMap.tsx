import { useModuleStore } from '@/entities/canvas'

export default function MiniMap() {
  const { modules } = useModuleStore()
  return (
    <div className="flex flex-col items-center justify-center">
      {modules.map((module) => (
        <img key={module.id} src={module.previewUrl} alt={module.id} className="w-10 h-10" />
      ))}
    </div>
  )
}
