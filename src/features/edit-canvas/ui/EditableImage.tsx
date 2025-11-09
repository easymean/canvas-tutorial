import type { CanvasImage } from '@/entities/canvas'
import type { KonvaEventObject } from 'konva/lib/Node'
import { Image } from 'react-konva'
import useImage from 'use-image'

type Props = {
  image: CanvasImage
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void
}

export const EditableImage = (props: Props) => {
  const { image, onDragEnd } = props
  const [img] = useImage(image.src, 'anonymous')

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    onDragEnd(e)
  }
  return (
    <Image
      key={image.id}
      id={image.id}
      image={img}
      x={image.x}
      y={image.y}
      width={image.width}
      height={image.height}
      src={image.src}
      draggable={true}
      onDragEnd={handleDragEnd}
    />
  )
}
