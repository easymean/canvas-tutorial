import { EditCanvas } from '@/features/edit-canvas'
import { MiniMap } from '@/features/mini-map'
import { type CanvasModule, useModuleStore } from '@/entities/canvas'
import { useEffect } from 'react'

const url = '/doguri.jpeg'

const data: CanvasModule[] = [
  {
    id: '1',
    data: {
      texts: [],
      images: [
        {
          id: 'image-1',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          src: url,
        },
      ],
    },
    previewUrl: '',
  },
  {
    id: '2',
    data: {
      texts: [],
      images: [
        {
          id: 'image-1',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          src: url,
        },
      ],
    },
    previewUrl: '',
  },
]

export default function Canvas() {
  const { selectedModuleId, modules, setSelectedModuleId, setModules } = useModuleStore()
  const module = modules.find((module) => module.id === selectedModuleId)

  const handleSelectModule = (id: string) => {
    setSelectedModuleId(id)
  }

  useEffect(() => {
    setModules(data)
  }, [setModules])

  return (
    <div className="grid grid-cols-2 gap-4">
      <MiniMap modules={modules} onSelectModule={handleSelectModule} />
      {module && <EditCanvas id={module.id} data={module.data} />}
    </div>
  )
}
