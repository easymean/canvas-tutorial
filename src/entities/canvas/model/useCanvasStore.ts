import { create } from 'zustand'
import type { CanvasTextNode, CanvasEditorState } from '../types'

type CanvasState = {
  canvasId: string
  texts: CanvasTextNode[]
  editor: CanvasEditorState | null
}

type CanvasActions = {
  setCanvasId: (canvasId: string) => void
  setTexts: (texts: CanvasTextNode[]) => void
  addText: (text: CanvasTextNode) => void
  updateText: (id: string, partial: Partial<CanvasTextNode>) => void
  setEditor: (editor: CanvasEditorState | null) => void
}

export type CanvasStore = CanvasState & CanvasActions

const initialText: CanvasTextNode = {
  id: 'text1',
  x: 50,
  y: 50,
  text: 'placeholer',
  fontSize: 24,
  fill: '#000',
  fontFamily: 'Arial',
  draggable: true,
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasId: 'canvas1',
  texts: [initialText],
  editor: null,
  setCanvasId: (canvasId) => set({ canvasId }),
  setTexts: (texts) => set({ texts }),
  addText: (text) =>
    set((state) => ({
      texts: [...state.texts, text],
    })),
  updateText: (id, partial) =>
    set((state) => ({
      texts: state.texts.map((text) => (text.id === id ? { ...text, ...partial } : text)),
    })),
  setEditor: (editor) => set({ editor }),
}))
