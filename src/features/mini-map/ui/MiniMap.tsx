import { type CanvasModule } from '@/entities/canvas'
import { PreviewImage } from './PreviewImage'

type Props = {
  modules: CanvasModule[]
  onSelectModule: (id: string) => void
}

export default function MiniMap(props: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      {props.modules.map((module) => (
        <PreviewImage
          key={module.id}
          src={module.previewUrl}
          onClick={() => props.onSelectModule(module.id)}
        />
      ))}
    </div>
  )
}
