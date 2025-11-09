export interface CanvasTextNode {
  id: string
  x: number
  y: number
  text: string
  fontSize: number
  fill: string
  fontFamily: string
  draggable: boolean
}

export interface CanvasEditorState {
  id: string
  text: string
  x: number
  y: number
  width: number
  height: number
  fontSize: number
  fill: string
  fontFamily: string
}

export interface CanvasImage {
  id: string
  x: number
  y: number
  width: number
  height: number
  src: string
}

export interface CanvasModule {
  id: string
  data: {
    texts: CanvasTextNode[]
    images: CanvasImage[]
  }
  previewUrl: string
}

export const initialText: CanvasTextNode = {
  id: 'text1',
  x: 50,
  y: 50,
  text: 'placeholer',
  fontSize: 24,
  fill: '#000',
  fontFamily: 'Arial',
  draggable: true,
}

export const initialImage: CanvasImage = {
  id: 'image1',
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  src: '/doguri.jpeg',
}
