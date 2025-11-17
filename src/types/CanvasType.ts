import type { Drawable } from "roughjs/bin/core"
import { Shape } from "../components/CanvasDrawing/Shapes/Shape"

export interface CanvasType {
  state: "Erase" | "DrawRect" | "Line" | "Selection"
}

export type CanvasAction =
  | "erase"
  | "draw"
  | "selection"
  | "none"
  | "resize"
  | "display"

interface TypeWarning {
  type: "stroke" | null
}

export interface WarningCanvas {
  showWarning: boolean
  warningMessage: string
  warningType: TypeWarning
}

export type TypeDraw = "normal" | "rough"
export type ColorType = "rgb" | "hex" | "hsl" | "hsv"
export type LinePoint = {
  x: number
  y: number
}

export type MouseLocation =
  | "tl"
  | "tr"
  | "bl"
  | "br"
  | "inside"
  | "start"
  | "end"
  | null

export interface Color {
  val1: string
  val2: string
  val3: string
  min: number
  max: number
  value1: number
  value2: number
  value3: number
}

export function getCanvasTypes(): { [index: string]: CanvasType } {
  return {
    erase: { state: "Erase" },
    drawRect: { state: "DrawRect" },
    line: { state: "Line" },
    select: { state: "Selection" },
  }
}

export interface CanvasElements {
  index: number
  x1: number
  x2: number
  y1: number
  y2: number
  selection: {
    offsetX: number
    offsetY: number
  }
  element: null | Drawable
  type: TypeDraw
  state: CanvasType
  strokeColor: string
  strokeWidth: number | string
}

export interface SetCursorOptions {
  element?: Shape
  value?: string
}
