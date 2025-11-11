import type { Drawable } from "roughjs/bin/core"

export interface CanvasType {
  state: "Erase" | "DrawRect" | "Line"
}

export type TypeDraw = "normal" | "rough"

export function getCanvasTypes(): { [index: string]: CanvasType } {
  return {
    erase: { state: "Erase" },
    drawRect: { state: "DrawRect" },
    line: { state: "Line" },
  }
}

export interface CanvasElements {
  x1: number
  x2: number
  y1: number
  y2: number
  element: null | Drawable
  type: TypeDraw
  state: CanvasType
  strokeColor: string
  strokeWidth: number | string
}
