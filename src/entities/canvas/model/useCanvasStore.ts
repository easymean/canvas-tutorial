import { create } from 'zustand'
import type { CanvasTextNode, CanvasEditorState, CanvasImage } from '../types'
import { devtools } from 'zustand/middleware'

type CanvasState = {
  canvasId: string
  texts: CanvasTextNode[]
  editor: CanvasEditorState | null
  images: CanvasImage[]
}

type CanvasActions = {
  setCanvasId: (canvasId: string) => void
  setTexts: (texts: CanvasTextNode[]) => void
  addText: (text: CanvasTextNode) => void
  updateText: (id: string, partial: Partial<CanvasTextNode>) => void
  setEditor: (editor: CanvasEditorState | null) => void
  addImage: (image: CanvasImage) => void
  updateImage: (id: string, partial: Partial<CanvasImage>) => void
  setImages: (images: CanvasImage[]) => void
}

export type CanvasStore = CanvasState & CanvasActions

export const useCanvasStore = create<CanvasStore>()(
  devtools((set) => ({
    canvasId: 'canvas1',
    texts: [],
    editor: null,
    images: [],
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
    addImage: (image) =>
      set((state) => ({
        images: [...state.images, image],
      })),
    updateImage: (id, partial) =>
      set((state) => ({
        images: state.images.map((image) => (image.id === id ? { ...image, ...partial } : image)),
      })),
    setImages: (images) => set({ images }),
  })),
)
