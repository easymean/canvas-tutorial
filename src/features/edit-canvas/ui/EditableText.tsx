'use client'

import React, { useRef, useEffect } from 'react'
import type { CanvasEditorState } from '@/entities/canvas'
import { useCanvasStore } from '@/entities/canvas'

type Props = { editor: CanvasEditorState }

const EditableText = (props: Props) => {
  const { text, x, y, width, height, fontSize, fill, fontFamily } = props.editor

  const { updateText, setEditor } = useCanvasStore()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [props.editor])

  const handleTextareaBlur = () => {
    // [수정] setTexts가 호출되면, 위의 useEffect가 자동으로 미리보기를 갱신합니다.
    updateText(props.editor.id, {
      text: props.editor.text,
    })
    setEditor(null)
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditor({
      ...props.editor,
      text: e.target.value,
    })
  }

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTextareaBlur()
    }
    if (e.key === 'Escape') {
      setEditor(null)
    }
  }

  return (
    <>
      {/* 텍스트 편집을 위한 HTML textarea (캔버스 위에 겹쳐짐) */}
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={handleTextareaChange}
        onBlur={handleTextareaBlur}
        onKeyDown={handleTextareaKeyDown}
        style={{
          // ... (textarea 스타일은 동일)
          position: 'absolute',
          top: `${y}px`,
          left: `${x}px`,
          width: `${width + 10}px`,
          height: `${height + 10}px`,
          fontSize: `${fontSize}px`,
          color: fill,
          fontFamily: fontFamily,
          border: '1px solid #0D99FF',
          padding: '0',
          margin: '0',
          overflow: 'hidden',
          background: 'white',
          resize: 'none',
          lineHeight: 1.2,
          outline: 'none',
          zIndex: 100,
        }}
      />
    </>
  )
}

export default EditableText
