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
