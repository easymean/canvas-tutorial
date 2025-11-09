import { Stage, Layer, Text } from 'react-konva'
import { CANVAS_WIDTH, CANVAS_HEIGHT, type CanvasTextNode } from '@/entities/canvas'
import { useCanvasStore, useModuleStore } from '@/entities/canvas'
import type { KonvaEventObject } from 'konva/lib/Node'
import { useRef, useEffect } from 'react'
import Konva from 'konva'
import EditableText from './EditableText'

type Props = {
  id: string
  data: object
}

export default function EditCanvas(props: Props) {
  const { id, data } = props
  const { texts, editor, updateText, addText, setEditor } = useCanvasStore()
  const { updateModule } = useModuleStore()
  const stageRef = useRef<Konva.Stage>(null)

  const handleStageDblClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target !== stageRef.current) {
      return
    }

    const stage = stageRef.current
    const pos = stage.getPointerPosition()
    if (!pos) return

    const newId = `text-${Date.now()}`
    const newText: CanvasTextNode = {
      id: newId,
      x: pos.x,
      y: pos.y,
      text: '새 텍스트',
      fontSize: 24,
      fill: '#000',
      fontFamily: 'Arial',
      draggable: true,
    }

    // [수정] setTexts가 호출되면, 위의 useEffect가 자동으로 미리보기를 갱신합니다.
    addText(newText)

    // ... (새 텍스트 즉시 편집 로직은 동일) ...
    setTimeout(() => {
      const textNode = stage.findOne(`#${newId}`) as Konva.Text
      if (textNode) {
        // ... (이하 동일)
        const stageBox = stage.container().getBoundingClientRect()
        const absPos = textNode.getAbsolutePosition()
        setEditor({
          id: newId,
          text: newText.text,
          x: stageBox.left + absPos.x,
          y: stageBox.top + absPos.y,
          width: textNode.width(),
          height: textNode.height(),
          fontSize: newText.fontSize,
          fill: newText.fill,
          fontFamily: newText.fontFamily,
        })
      }
    }, 0)
  }

  const handleTextDblClick = (e: KonvaEventObject<MouseEvent>) => {
    const textNode = e.target as Konva.Text
    const stage = textNode.getStage()
    if (!stage) return
    const absPos = textNode.getAbsolutePosition()
    const stageBox = stage.container().getBoundingClientRect()

    setEditor({
      id: textNode.id(),
      text: textNode.text(),
      x: stageBox.left + absPos.x,
      y: stageBox.top + absPos.y,
      width: textNode.width(),
      height: textNode.height(),
      fontSize: textNode.fontSize(),
      fill: textNode.fill(),
      fontFamily: textNode.fontFamily(),
    })
  }

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const id = e.target.id()
    const newX = e.target.x()
    const newY = e.target.y()

    // [수정] setTexts가 호출되면, 위의 useEffect가 자동으로 미리보기를 갱신합니다.
    updateText(id, { x: newX, y: newY })
  }

  // [추가] 캔버스 상태가 변경될 때마다 미리보기를 업데이트하는 Effect
  // (texts 배열이 바뀔 때 = 텍스트 추가, 수정, 이동 완료 시)
  useEffect(() => {
    if (stageRef.current) {
      // Data URL 생성.
      // pixelRatio를 0.5 정도로 낮추면 생성 속도가 빠르고 이미지 용량이 작아집니다.
      const dataURL = stageRef.current.toDataURL({ pixelRatio: 0.5 })
      updateModule(id, { previewUrl: dataURL })
    }
  }, [texts, id, data, updateModule]) // 'texts' 상태가 변경될 때마다 이 Effect가 실행됩니다.

  return (
    <div className="border-solid border-2 border-gray-300">
      <Stage
        width={CANVAS_WIDTH} // [수정] 변수 사용
        height={CANVAS_HEIGHT}
        ref={stageRef}
        onDblClick={handleStageDblClick}
      >
        <Layer>
          {texts.map((text) => (
            <Text
              key={text.id}
              id={text.id}
              x={text.x}
              y={text.y}
              text={text.text}
              fontSize={text.fontSize}
              fill={text.fill}
              fontFamily={text.fontFamily}
              draggable={text.draggable}
              onDblClick={handleTextDblClick}
              onDragEnd={handleDragEnd}
              visible={!editor || editor.id !== text.id}
            />
          ))}
        </Layer>
      </Stage>
      {editor && <EditableText editor={editor} />}
    </div>
  )
}
